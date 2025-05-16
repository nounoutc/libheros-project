import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskListOwnerGuard } from '../task-lists/guards/task-list-owner.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('task-lists/:taskListId/tasks')
  @UseGuards(TaskListOwnerGuard)
  async create(
    @Param('taskListId') taskListId: string,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<any> {
    const parsedTaskListId = parseInt(taskListId, 10);
    return this.tasksService.create(parsedTaskListId, createTaskDto);
  }

  @Get('task-lists/:taskListId/tasks')
  @UseGuards(TaskListOwnerGuard)
  async findAll(
    @Param('taskListId') taskListId: string,
  ): Promise<any[]> {
    const parsedTaskListId = parseInt(taskListId, 10);
    return this.tasksService.findAll(parsedTaskListId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    const taskId = parseInt(id, 10);
    return this.tasksService.findOne(taskId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto): Promise<any> {
    const taskId = parseInt(id, 10);
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const taskId = parseInt(id, 10);
    await this.tasksService.remove(taskId);
  }
}
