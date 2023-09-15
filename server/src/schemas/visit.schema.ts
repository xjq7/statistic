import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitDocument = Visit & Document;

@Schema({ collection: 'visit' })
export class Visit extends Document {
  @Prop({ required: true })
  app_id: string;

  @Prop()
  referrer: string;

  @Prop()
  ip: string;

  @Prop()
  ua: string;

  @Prop()
  createdAt: string;
}

export const VisitSchema = SchemaFactory.createForClass(Visit);
