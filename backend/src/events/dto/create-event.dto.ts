import { EventType } from '../schemas/event.schema';

export interface CreateEventDto {
  name: string;
  type: EventType;
}
