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
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskListOwnerGuard } from './guards/task-list-owner.guard';
import { Request } from 'express';

@Controller('task-lists')
@UseGuards(JwtAuthGuard)
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body(ValidationPipe) createTaskListDto: CreateTaskListDto,
  ): Promise<any> {
    const userId = req.user['id'];
    return this.taskListsService.create(userId, createTaskListDto);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<any[]> {
    const userId = req.user['id'];
    return this.taskListsService.findAll(userId);
  }

  @Get(':id')
  @UseGuards(TaskListOwnerGuard)
  async findOne(@Param('id') id: string): Promise<any> {
    const taskListId = parseInt(id, 10);
    return this.taskListsService.findOne(taskListId);
  }

  @Patch(':id')
  @UseGuards(TaskListOwnerGuard)
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateTaskListDto: UpdateTaskListDto,
  ): Promise<any> {
    const taskListId = parseInt(id, 10);
    return this.taskListsService.update(taskListId, updateTaskListDto);
  }

  @Delete(':id')
  @UseGuards(TaskListOwnerGuard)
  async remove(@Param('id') id: string): Promise<void> {
    const taskListId = parseInt(id, 10);
    await this.taskListsService.remove(taskListId);
  }
}
