import { Controller, Post, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('createEvent')
  createEvent(createEventDto: CreateEventDto): Promise<CreateEventDto> {
    return this.eventsService.createEvent(createEventDto);
  }
}
