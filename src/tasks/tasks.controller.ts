import { Controller } from '@nestjs/common';

@Controller('tasks')
export class TasksController {}
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskListOwnerGuard } from '../task-lists/guards/task-list-owner.guard';
import { Request } from 'express';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('task-lists/:taskListId/tasks')
  @UseGuards(TaskListOwnerGuard)
  async create(
    @Req() req: Request,
    @Param('taskListId') taskListId: string,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
  ): Promise<any> {
    const parsedTaskListId = parseInt(taskListId, 10);
    return this.tasksService.create(parsedTaskListId, createTaskDto);
  }

  @Get('task-lists/:taskListId/tasks')
  @UseGuards(TaskListOwnerGuard)
  async findAll(
    @Req() req: Request,
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
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
  ): Promise<any> {
    const taskId = parseInt(id, 10);
    return this.tasksService.update(taskId, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const taskId = parseInt(id, 10);
    await this.tasksService.remove(taskId);
  }
}
