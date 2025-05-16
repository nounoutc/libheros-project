import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TaskListsService } from '../../task-lists/task-lists.service';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private readonly taskListsService: TaskListsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user['id'];
    const taskId = parseInt(request.params.id, 10);

    if (isNaN(taskId)) {
      throw new UnauthorizedException('Invalid task ID');
    }

    const task = await this.tasksService.findOne(taskId);
    if (!task) {
      throw new UnauthorizedException('Task not found.');
    }
    const isOwner = await this.taskListsService.isOwner(
      userId,
      task.taskListId,
    );

    if (!isOwner) {
      throw new UnauthorizedException(
        'You are not the owner of the task list for this task',
      );
    }
    return true;
  }
}
