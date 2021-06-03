import { CustomError } from './custom.error';
import { ErrorCodes } from './errorCodes';
export class IdempotencyKeyExistsError extends CustomError {
  public code: number;
  constructor() {
    super('x-idempotency-key key should be uniq!');
    this.name = this.constructor.name;
    this.code = ErrorCodes.IdempotancyError;
  }
}
