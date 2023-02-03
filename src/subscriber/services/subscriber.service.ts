import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, MongoRepository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private eventRepository: MongoRepository<Subscriber>,
  ) {}

  createSubscriber(createSubscriberDto: CreateSubscriberDto) {
    const subscriber: Subscriber =
      this.eventRepository.create(createSubscriberDto);
    return this.eventRepository.save(subscriber);
  }

  async getEventSubscriberUrls(actionTypeEnum: ActionTypeEnum) {
    const subscriber: Subscriber[] = await this.eventRepository.find({
      where: { eventTypes: actionTypeEnum },
    });
    const toto: Subscriber[] = await this.eventRepository.findBy({
      eventTypes: 'USER.CREATE',
    });
    const toto2: Subscriber[] = await this.eventRepository.findBy({
      eventTypes: actionTypeEnum,
    });
    const subscriber2: Subscriber[] = await this.eventRepository.find({
      where: { eventTypes: ArrayContains([actionTypeEnum]) },
    });

    return subscriber.map((value) => value.webhookUrl);
  }
}
