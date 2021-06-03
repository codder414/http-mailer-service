import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MailDocument = Mail & Document;

@Schema()
export class Mail {
  @Prop()
  subject: string;

  @Prop()
  from: string;

  @Prop()
  body: string;

  @Prop({ unique: true })
  idempotencyKey: string;

  @Prop({ enum: ['processed', 'pending'] })
  status: string;
}

export const CatSchema = SchemaFactory.createForClass(Mail);
