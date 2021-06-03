import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { EMail, EMailSchema } from './email.schema';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EMail.name, schema: EMailSchema }]),
    BullModule.registerQueue({
      name: 'mails',
    }),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EMailModule {}
