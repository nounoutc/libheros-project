import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { TaskListsService } from '../task-lists.service';

@Injectable()
export class TaskListOwnerGuard implements CanActivate {
  constructor(private readonly taskListsService: TaskListsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user ? request.user['id'] : undefined; // Check if request.user exists
    const taskListId = parseInt(request.params.id, 10);

    if (isNaN(taskListId)) {
      throw new UnauthorizedException('Invalid task list ID');
    }

    if (!userId) {
      throw new UnauthorizedException('User not authenticated'); // Handle case where user is not authenticated
    }
    const isOwner = await this.taskListsService.isOwner(userId, taskListId);

    if (!isOwner) {
      throw new UnauthorizedException('You are not the owner of this task list');
    }

    return true;
  }
}
