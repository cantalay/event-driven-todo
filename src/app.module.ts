import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TodoItemModule } from './todo-item/todo-item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuditlogModule } from './auditlog/auditlog.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthModule } from './auth/auth.module';

//TODO: Generate configmap here
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://root:root@localhost:27017',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    TodoItemModule,
    UserModule,
    AuthModule,
    AuditlogModule,
    SubscriberModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
