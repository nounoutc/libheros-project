import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TaskListsService } from '../../task-lists/task-lists.service';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private readonly taskListsService: TaskListsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user ? request.user['id'] : undefined;  // Check if request.user exists
    const taskId = parseInt(request.params.id, 10);

    if (isNaN(taskId)) {
      throw new UnauthorizedException('Invalid task ID');
    }
     if (!userId) {
      throw new UnauthorizedException('User not authenticated'); // Handle case where user is not authenticated
    }

    // First, get the task, then check ownership of the associated task list.
    //  This assumes you have a method in TasksService to get a task by ID
    //  and that your Task entity has a taskListId.
    const task = await this.taskListsService.findOne(taskId); //  findOne defined in task.service.ts
    if (!task) {
      throw new UnauthorizedException('Task not found.');
    }
    const isOwner = await this.taskListsService.isOwner(userId, task.taskListId); // Use taskListId

    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of the task list for this task');
    }
    return true;
  }
}
