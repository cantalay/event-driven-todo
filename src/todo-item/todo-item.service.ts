import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { UserService } from '../user/user.service';
import { TodoStatusEnum } from './enums/todo-status.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: MongoRepository<TodoItem>,
    private userService: UserService,
  ) {}

  create(createTodoItemDto: CreateTodoItemDto) {
    const todoItem: TodoItem =
      this.todoItemRepository.create(createTodoItemDto);
    return this.todoItemRepository.save(todoItem);
  }

  async findAll() {
    const todoItemList: Array<TodoItem> = await this.todoItemRepository.find();
    if (todoItemList.length > 0) {
      return todoItemList;
    } else {
      throw new NotFoundException('No todo-item found in here.');
    }
  }

  async findOne(id: string) {
    const todoItem: TodoItem = await this.todoItemRepository.findOneBy(id);
    if (todoItem) {
      return todoItem;
    } else {
      throw new NotFoundException('Todo item not found.');
    }
  }

  async update(id: string, updateTodoItemDto: UpdateTodoItemDto) {
    const todoItem: TodoItem = await this.todoItemRepository.findOneBy(id);
    if (todoItem) {
      todoItem.name = updateTodoItemDto.name
        ? updateTodoItemDto.name
        : todoItem.name;
      return this.todoItemRepository.save(todoItem);
    } else {
      throw new NotFoundException('Todo item not found.');
    }
  }

  async remove(id: string) {
    const todoItem: TodoItem = await this.todoItemRepository.findOneBy(id);
    if (todoItem) {
      this.todoItemRepository.delete(id);
      return todoItem;
    } else {
      throw new NotFoundException('Todo item not found.');
    }
  }

  async assignToUser(todoId: string, userId: string) {
    const userItem: User = await this.userService.findOne(userId);
    const todoItem: TodoItem = await this.todoItemRepository.findOneBy(todoId);
    if (userItem && todoItem) {
      todoItem.userName = userItem.userName;
      todoItem.status = TodoStatusEnum.IN_PROGRESS;
      return await this.todoItemRepository.save(todoItem);
    } else {
      throw new NotFoundException('Todo item found.');
    }
  }

  async markAsCompleted(todoId: string) {
    const todoItem: TodoItem = await this.todoItemRepository.findOneBy(todoId);
    if (todoItem) {
      todoItem.status = TodoStatusEnum.DONE;
      return this.todoItemRepository.save(todoItem);
    } else {
      throw new NotFoundException('Todo item not found.');
    }
  }
}
