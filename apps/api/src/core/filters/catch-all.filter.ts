import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import type { ApiErrorDto } from "@repo/shared/contracts";
import { AppError, ERROR_KIND, type ErrorKind } from "@repo/shared/errors";

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
  private readonly logger = new Logger(CatchAllFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = this.toApiError(exception);

    httpAdapter.reply(ctx.getResponse(), response, response.statusCode);
  }

  private toApiError(exception: unknown): ApiErrorDto {
    if (exception instanceof AppError) return this.fromAppError(exception);
    if (exception instanceof HttpException) return this.fromHttpException(exception);

    this.logUnknown(exception);

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

  private logUnknown(exception: unknown): void {
    if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
      return;
    }

    this.logger.error(exception);
  }
}
