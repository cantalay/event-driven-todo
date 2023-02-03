import { Module } from '@nestjs/common';
import { SubscriberService } from './services/subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscriberController],
  providers: [SubscriberService],
  exports: [SubscriberService],
})
export class SubscriberModule {}
