import { Injectable } from '@nestjs/common';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { HttpService } from '@nestjs/axios';
import { EventService } from '../../event/services/event.service';
import { LogPublisherDto } from '../dto/log-publisher.dto';

@Injectable()
export class PublisherService {
  constructor(
    private eventService: EventService,
    private readonly httpService: HttpService,
  ) {}

  async publishEvent(
    action: ActionTypeEnum,
    userInfo,
    todoId: string,
    executionTime: Date,
  ) {
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
  }
}
