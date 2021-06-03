import { Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller()
export class EmailController {
  constructor(private readonly appService: EmailService) {}

  @Post('/mail')
  send(): string {
    return this.appService.getHello();
  }
}
