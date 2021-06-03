import { CustomError } from './custom.error';
import { ErrorCodes } from './errorCodes';
export class SmtpAuthError extends CustomError {
  public code: number;
  constructor(msg: string) {
    super(msg);
    this.name = this.constructor.name;
    this.code = ErrorCodes.SmtpAuthError;
  }
}
