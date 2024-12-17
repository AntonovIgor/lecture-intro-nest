import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class BusinessExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const problemDetails = {
      type: 'https://example.com/details',
      title: exception.message || 'Business Logic Error',
      status: status,
      detail: exception.getResponse(),
      instance: request.url,
    };

    response.status(status).json(problemDetails);
  }
}
