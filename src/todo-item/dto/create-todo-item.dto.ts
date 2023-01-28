import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class CreateTodoItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmpty()
  user: User;

  @IsEmpty()
  status: TodoStatusEnum;
}
