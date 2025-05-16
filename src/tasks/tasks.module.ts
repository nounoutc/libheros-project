import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from '../prisma/prisma.service';
import { TaskListOwnerGuard } from '../task-lists/guards/task-list-owner.guard';

@Module({
  imports: [],
  controllers: [TasksController],
  providers: [TasksService, PrismaService, TaskListOwnerGuard],
  exports: [TasksService],
})
export class TasksModule {}
