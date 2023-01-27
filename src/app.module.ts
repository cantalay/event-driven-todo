import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TodoItemModule } from './todo-item/todo-item.module';

@Module({
  imports: [UserModule, TodoItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
