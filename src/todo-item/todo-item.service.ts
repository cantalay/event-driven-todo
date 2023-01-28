import { Injectable } from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { UpdateTodoItemDto } from './dto/update-todo-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { TodoItem } from './entities/todo-item.entity';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItem)
    private todoItemRepository: MongoRepository<TodoItem>,
  ) {}
  create(createTodoItemDto: CreateTodoItemDto) {
    const todoItem: TodoItem =
      this.todoItemRepository.create(createTodoItemDto);
    return this.todoItemRepository.save(todoItem);
  }

  findAll() {
    return this.todoItemRepository.find();
  }

  findOne(id: string) {
    return this.todoItemRepository.findOneBy(id);
  }

  update(id: string, updateTodoItemDto: UpdateTodoItemDto) {
    return this.todoItemRepository.update(id, {
      updatedAt: new Date(),
      ...updateTodoItemDto,
    });
  }

  remove(id: string) {
    return this.todoItemRepository.delete(id);
  }
}
