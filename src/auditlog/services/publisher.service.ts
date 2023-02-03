import { Injectable } from '@nestjs/common';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { HttpService } from '@nestjs/axios';
import { SubscriberService } from '../../subscriber/services/subscriber.service';
import { LogPublisherDto } from '../dto/log-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    private eventService: SubscriberService,
    private readonly httpService: HttpService,
  ) {}

  async publishEvent(
    action: ActionTypeEnum,
    userInfo,
    todoId: string,
    executionTime: Date,
  ): Promise<boolean> {
    const logPublisherDto: LogPublisherDto = new LogPublisherDto();
    logPublisherDto.todoId = todoId;
    logPublisherDto.userName = userInfo.userName;
    logPublisherDto.action = action;
    logPublisherDto.executionTime = executionTime;
    const webhookList = await this.eventService.getEventSubscriberUrls(action);

    webhookList.forEach((value) => {
      this.httpService.axiosRef.post(value, {
        logPublisherDto,
      });
    });
    return webhookList.length > 0;
  }
}
