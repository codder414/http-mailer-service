import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EMailDocument = EMail & Document;

@Schema()
export class EMail {
  @Prop()
  subject: string;

  @Prop()
  to: string;

  @Prop()
  body: string;

  @Prop({ unique: true })
  idempotencyKey: string;
}

export const EMailSchema = SchemaFactory.createForClass(EMail);
