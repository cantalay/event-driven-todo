import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';
import { PaginationDto } from './pagination.dto';

export class AuditlogFilterDto {
  @IsOptional()
  @IsArray()
  actions: Array<ActionTypeEnum>;

  @IsOptional()
  type: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  todoId: string;

  @IsOptional()
  pagination: PaginationDto;
}
