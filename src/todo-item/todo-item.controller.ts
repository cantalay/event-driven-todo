import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { AuditLogInterceptor } from '../auditlog/audit-log.interceptor';
import { ActionTypeEnum } from '../common/enums/action-type.enum';

@Controller('todo-item')
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post()
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.TODO_CREATE))
  create(@Body() createTodoItemDto: CreateTodoItemDto) {
    return this.todoItemService.create(createTodoItemDto);
  }

  @Get()
  findAll() {
    return this.todoItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoItemService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.TODO_UPDATE))
  update(
    @Param('id') id: string,
    @Body() updateTodoItemDto: UpdateTodoItemDto,
  ) {
    return this.todoItemService.update(id, updateTodoItemDto);
  }

  @Delete(':id')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.TODO_DELETE))
  remove(@Param('id') id: string) {
    return this.todoItemService.remove(id);
  }

  @Patch('/assign/:todoId/:userId')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.TODO_ASSIGN))
  assignToUser(
    @Param('todoId') todoId: string,
    @Param('userId') userId: string,
  ) {
    return this.todoItemService.assignToUser(todoId, userId);
  }

  @Patch('/completed/:todoId')
  @UseInterceptors(AuditLogInterceptor(ActionTypeEnum.TODO_COMPLETE))
  markAsCompleted(@Param('todoId') todoId: string) {
    return this.todoItemService.markAsCompleted(todoId);
  }
}
