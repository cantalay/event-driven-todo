import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { ActionTypeEnum } from '../../common/enums/action-type.enum';

@Entity()
export class Subscriber {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  webhookUrl: string;

  @Column()
  eventTypes: ActionTypeEnum[];

  @CreateDateColumn()
  createdAt: Date;
}
