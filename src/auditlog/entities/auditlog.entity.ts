import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { AuditlogTypeEnum } from '../enums/auditlog-type.enum';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

@Entity()
export class Auditlog {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  todoId: string;

  @Column()
  userName: string;

  @Column()
  action: ActionTypeEnum;

  @Column()
  type: AuditlogTypeEnum;

  @Column()
  executionTime: Date;

  @CreateDateColumn()
  createdAt: Date;
}
