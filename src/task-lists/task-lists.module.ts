import { Module } from '@nestjs/common';
import { TaskListsService } from './task-lists.service';

@Module({
  providers: [TaskListsService]
})
export class TaskListsModule {}
