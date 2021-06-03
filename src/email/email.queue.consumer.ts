import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { SaveEmailDto } from './save-email.dto';
import { SmtpAuthError } from './errors/smtp.auth.error';

@Processor('mails')
export class EmailConsumer {
  private transporter: nodemailer.Transporter;
  private logger = new Logger(EmailConsumer.name);
  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get<string>('SMTP_HOST'),
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        pass: configService.get<string>('EMAIL_PASS'),
      },
      secure: true,
      port: +configService.get<number>('SMTP_PORT'),
    });
  }
  @Process()
  async run(job: Job<SaveEmailDto>) {
    this.logger.log({ jobData: job.data }, 'Consuming task:');
    try {
      const emailMessage = {
        from: `"MailRobot" <${this.configService.get<string>('EMAIL_USER')}>`,
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.body,
      };
      this.logger.log({ emailMessage }, 'Data to send:');
      const info = await this.transporter.sendMail(emailMessage);
      return info;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
