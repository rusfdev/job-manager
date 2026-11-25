import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { CustomError, ErrorKind } from "@repo/common/errors";
import type { ApiErrorDto } from "@repo/contracts";
import { Logger } from "@repo/logger";

const HTTP_STATUS_BY_KIND: Record<ErrorKind, HttpStatus> = {
  [ErrorKind.VALIDATION]: HttpStatus.BAD_REQUEST,
  [ErrorKind.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
  [ErrorKind.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ErrorKind.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorKind.CONFLICT]: HttpStatus.CONFLICT,
};

@Catch()
export class CatchAllFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = this.toApiError(exception);

    httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
  }

  private toApiError(exception: unknown): ApiErrorDto {
    if (exception instanceof CustomError) return this.fromCustomError(exception);
    if (exception instanceof HttpException) return this.fromHttpException(exception);

    this.logger.error(exception);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    };
  }

  private fromCustomError(exception: CustomError): ApiErrorDto {
    return {
      statusCode: HTTP_STATUS_BY_KIND[exception.kind],
      errorCode: exception.code,
      message: exception.message,
    };
  }

  private fromHttpException(exception: HttpException): ApiErrorDto {
    return {
      statusCode: exception.getStatus(),
      errorCode: exception.errorCode,
      message: exception.message,
    };
  }
}
