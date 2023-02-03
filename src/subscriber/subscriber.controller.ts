import { Body, Controller, Post } from '@nestjs/common';
import { SubscriberService } from './services/subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';

@Controller('event')
export class SubscriberController {
  constructor(private readonly eventService: SubscriberService) {}

  @Post('/subscribe')
  subscribe(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.eventService.createSubscriber(createSubscriberDto);
  }
}
