import { Module } from '@nestjs/common';
import { TodoItemService } from './todo-item.service';
import { TodoItemController } from './todo-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItem } from './entities/todo-item.entity';
import { UserModule } from '../user/user.module';
import { AuditlogModule } from '../auditlog/auditlog.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItem]), UserModule, AuditlogModule],
  controllers: [TodoItemController],
  providers: [TodoItemService],
})
export class TodoItemModule {}
