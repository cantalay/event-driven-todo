import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';

export class AuditlogDto {
  @IsString()
  @IsOptional()
  userName: string;

  @IsOptional()
  todoId: string;

  @IsEnum(ActionTypeEnum)
  action: ActionTypeEnum;

  @IsEnum(AuditlogTypeEnum)
  type: AuditlogTypeEnum;

  @IsDate()
  executionTime: Date;
}
