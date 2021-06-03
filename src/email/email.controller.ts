import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './send-mail.dto';

@Controller('mail')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/')
  send(@Body() sendEmailDto: SendEmailDto) {
    return { msg: 'here', body: sendEmailDto.subject };
  }
}
