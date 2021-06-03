import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomError } from './errors/custom.error';
import { ResponseError } from './response.types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof CustomError) {
      return response.status(status).json({
        code: exception.code,
        msg: exception.message,
        path: request.url,
      } as ResponseError);
    } else {
      response.status(status).json({
        code: 1000,
        path: request.url,
        msg: (<any>exception).response
          ? (<any>exception).response?.message
          : (<any>exception).message,
      } as ResponseError);
    }
  }
}
