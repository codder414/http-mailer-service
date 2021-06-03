import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { EMailModule } from './email/email.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongodb/mails'),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    EMailModule,
  ],
})
export class AppModule {}
