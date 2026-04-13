import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { mapPrismaError } from '../errors/prisma-error.mapper';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let error = 'InternalServerError';

    // ✅ Prisma Errors (FIRST PRIORITY)
    const prismaError = mapPrismaError(exception as any);
    if (prismaError) {
      status = prismaError.status;
      message = prismaError.message;
      error = prismaError.error;
    }

    // ✅ NestJS HTTP Exceptions
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'string') {
        message = res;
      } else if (typeof res === 'object') {
        const r = res as any;
        message = Array.isArray(r.message)
          ? r.message.join(', ')
          : r.message || message;
        error = r.error || error;
      }
    }

    // ✅ Fallback (unknown errors)
    else if (exception instanceof Error) {
      message = exception.message || message;
    }

    response.status(status).json({
      success: false,
      message,
      error,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
