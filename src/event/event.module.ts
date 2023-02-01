import { Module } from '@nestjs/common';
import { EventService } from './services/event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
