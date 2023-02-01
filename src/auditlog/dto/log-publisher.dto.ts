import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';

export class LogPublisherDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsOptional()
  todoId: string;

  @IsEnum(ActionTypeEnum)
  action: ActionTypeEnum;

  @IsDate()
  executionTime: Date;
}
