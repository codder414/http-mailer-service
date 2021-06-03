import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './send-mail.dto';
import { EMail, EMailDocument } from './email.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IdempotencyKeyExistsError } from './errors/idempotency.error';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(EMail.name) private mailModel: Model<EMailDocument>,
    @InjectQueue('mails') private mailsQueue: Queue,
  ) {}

  private readonly logger = new Logger(EmailService.name);

  async send(
    mailData: SendEmailDto,
  ): Promise<{ code: 0; msg: 'ok' } | { code: 1; msg: string }> {
    const mongoLogData = await this.persistMail(mailData);
    const queueLogData = await this.sendToQueue(mailData);

    this.logger.log(mongoLogData);
    this.logger.log(queueLogData);

    return { code: 0, msg: 'ok' };
  }

  private async persistMail(mailData: SendEmailDto): Promise<EMail> {
    try {
      const createdMail = new this.mailModel(mailData);
      const email = await createdMail.save();
      return email;
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new IdempotencyKeyExistsError();
      }
      throw err;
    }
  }

  private async sendToQueue(mailData: SendEmailDto): Promise<any> {
    const sendTask = await this.mailsQueue.add(mailData);
    return sendTask;
  }
}
