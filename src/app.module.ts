import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { MissionsModule } from './missions/missions.module';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { TasksService } from './tasks/tasks.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, TaskListsModule, TasksModule],
  providers: [TasksService],
})
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // accessible partout sans réimportation
    }),
  ],
})
@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
