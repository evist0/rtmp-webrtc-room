import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../users/schemas/user.schema';

export type EventDocument = Event & Document;

export enum EventType {
  WebRTC = 'WebRTC',
  RTMP = 'RTMP',
}

@Schema()
export class Event {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: EventType;
}

export const EventSchema = SchemaFactory.createForClass(Event);
