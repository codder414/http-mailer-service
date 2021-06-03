import { Injectable, Logger } from '@nestjs/common';
import { SendEmailDto } from './send-mail.dto';
import { SaveEmailDto } from './save-email.dto';
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
    idempotencyKey: string,
  ): Promise<{ code: 0; msg: 'ok' }> {
    const mongoLogData = await this.persistMail({
      ...mailData,
      idempotencyKey,
    });
    const queueLogData = await this.sendToQueue({
      ...mailData,
      idempotencyKey,
    });

    this.logger.log(mongoLogData, 'Saved:');
    this.logger.log(queueLogData.data, 'Enqueued:');

    return { code: 0, msg: 'ok' };
  }

  private async persistMail(mailData: SaveEmailDto): Promise<EMail> {
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

  private async sendToQueue(mailData: SaveEmailDto): Promise<any> {
    const sendTask = await this.mailsQueue.add(mailData);
    return sendTask;
  }
}
