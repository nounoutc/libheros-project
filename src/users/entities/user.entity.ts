import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'; // TypeORM decorators
import { TaskList } from '../../task-lists/entities/task-list.entity'; // Import if you have it
import { Task } from '../../tasks/entities/task.entity'; // Import if you have it

@Entity() // TypeORM:  Maps this class to the 'user' table in the database.
export class User {
  @PrimaryGeneratedColumn() // TypeORM:  Marks 'id' as the primary key, auto-generated.
  id: number;

  @Column({ unique: true }) // TypeORM:  Maps 'email' to a column, and makes it unique.
  email: string;

  @Column() // TypeORM:  Maps 'password' to a column.
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(() => TaskList, (taskList) => taskList.user) // TypeORM: Defines the relationship
  taskLists: TaskList[];

  @OneToMany(() => Task, (task) => task.taskList) // TypeORM: Defines the relationship
  tasks: Task[];
  // ... other properties ...
}

/*
// If using Prisma, you define the model in schema.prisma:

model User {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  password  String
  firstName String
  lastName  String
  taskLists TaskList[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
*/
