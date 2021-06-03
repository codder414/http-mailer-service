import { Module } from '@nestjs/common';
import { EmailController } from './email/email.controller';
import { EmailService } from './email/email.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb/mails')],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {}
