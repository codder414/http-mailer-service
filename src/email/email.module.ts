import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EMail, EMailSchema } from './email.schema';
import { BullModule } from '@nestjs/bull';
import { EmailConsumer } from './email.queue.consumer';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: EMail.name, schema: EMailSchema }]),
    BullModule.registerQueue({
      name: 'mails',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailConsumer],
})
export class EMailModule {}
