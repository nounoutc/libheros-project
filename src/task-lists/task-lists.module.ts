import { Module } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { TaskListsController } from './task-lists.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskListOwnerGuard } from './guards/task-list-owner.guard';

@Module({
  imports: [],
  controllers: [TaskListsController],
  providers: [
    TaskListsService,
    PrismaService,
    JwtAuthGuard,
    TaskListOwnerGuard,
  ],
  exports: [TaskListsService],
})
export class TaskListsModule {}
