import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

export class AuditlogFilterDto {
  @IsOptional()
  @IsArray()
  actions: Array<ActionTypeEnum>;

  @IsOptional()
  type: string;

  @IsOptional()
  @IsArray()
  users: Array<string>;

  @IsOptional()
  todoId: string;
}
