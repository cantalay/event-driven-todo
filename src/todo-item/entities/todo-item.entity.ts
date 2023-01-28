import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ObjectID,
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { User } from '../../user/entities/user.entity';

@Entity()
export class TodoItem {
  @ObjectIdColumn({ name: 'id' })
  _id: ObjectID;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
  })
  status: TodoStatusEnum = TodoStatusEnum.TODO;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
