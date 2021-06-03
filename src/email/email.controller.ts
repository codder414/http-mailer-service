import {
  Controller,
  Post,
  Body,
  Headers,
  Res,
  HttpException,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './send-mail.dto';
import { Response } from 'express';
import { isUUID } from 'class-validator';
import { IdempotencyKeyExistsError } from './errors/idempotency.error';
@Controller('mail')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('/')
  async send(
    @Body() sendEmailDto: SendEmailDto,
    @Headers('x-idempotency-key') idempotencyId,
    @Res() res: Response,
  ) {
    if (!idempotencyId) {
      return res.status(401).json({
        msg: 'x-idempotency-key is missing in headers!',
        code: 1,
      });
    }
    if (!isUUID(idempotencyId, 4)) {
      return res.status(401).json({
        msg: 'x-idempotency-key should be a valid uuid!',
        code: 1,
      });
    }
    const result = await this.emailService.send(sendEmailDto);
    return res.json(result);
  }
}
