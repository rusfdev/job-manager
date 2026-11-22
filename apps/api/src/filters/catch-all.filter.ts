import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import type { ApiErrorDto } from "@repo/common/contracts";
import { AppError, ERROR_KIND, type ErrorKind } from "@repo/common/errors";
import { Logger } from "@repo/logger";

const HTTP_STATUS_BY_KIND: Record<ErrorKind, HttpStatus> = {
  [ERROR_KIND.VALIDATION]: HttpStatus.BAD_REQUEST,
  [ERROR_KIND.UNAUTHENTICATED]: HttpStatus.UNAUTHORIZED,
  [ERROR_KIND.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ERROR_KIND.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ERROR_KIND.CONFLICT]: HttpStatus.CONFLICT,
  [ERROR_KIND.RATE_LIMIT]: HttpStatus.TOO_MANY_REQUESTS,
  [ERROR_KIND.INTERNAL]: HttpStatus.INTERNAL_SERVER_ERROR,
  [ERROR_KIND.UNAVAILABLE]: HttpStatus.SERVICE_UNAVAILABLE,
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
    if (exception instanceof AppError) return this.fromAppError(exception);
    if (exception instanceof HttpException) return this.fromHttpException(exception);

    this.logger.error(exception);

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Internal server error",
    };
  }

  private fromAppError(exception: AppError): ApiErrorDto {
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
