import { Body, Controller, Post } from '@nestjs/common';
import { EventService } from './services/event.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/subscribe')
  subscribe(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.eventService.createSubscriber(createSubscriberDto);
  }
}
