import { IsArray, IsEnum, IsNotEmpty, IsUrl } from 'class-validator';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

export class CreateSubscriberDto {
  @IsUrl()
  webhookUrl: string;

  @IsArray()
  @IsEnum(ActionTypeEnum, { each: true })
  @IsNotEmpty()
  eventTypes: ActionTypeEnum[];
}
