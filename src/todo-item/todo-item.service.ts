import { Injectable } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: Repository<TodoItem>,
  ) {}
  create(createTodoItemDto: CreateTodoItemDto) {
    const todoItem: TodoItem =
      this.todoItemRepository.create(createTodoItemDto);
    return this.todoItemRepository.save(todoItem);
  }

  findAll() {
    return `This action returns all todoItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoItem`;
  }

  update(id: number, updateTodoItemDto: UpdateTodoItemDto) {
    return `This action updates a #${id} todoItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoItem`;
  }
}
