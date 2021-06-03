import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        return new ConflictException('Duplicate of x-idempotancy-key!');
      default:
        return new HttpException('Internal server error', 500);
    }
  }
}
