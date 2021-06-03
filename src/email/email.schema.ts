import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EMailDocument = EMail & Document;

@Schema()
export class EMail {
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

export const EMailSchema = SchemaFactory.createForClass(EMail);
