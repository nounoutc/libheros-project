import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskList } from '../../task-lists/entities/task-list.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => TaskList, (taskList) => taskList.user)
  taskLists: TaskList[];

  @OneToMany(() => Task, (task) => task.taskList)
  tasks: Task[];
}
