import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TaskListsService } from './task-lists.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('task-lists')
export class TaskListsController {
  constructor(private readonly taskListsService: TaskListsService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateTaskListDto) {
    return this.taskListsService.create(req.user.userId, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.taskListsService.findAllByUser(req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskListDto) {
    return this.taskListsService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListsService.remove(+id);
  }
}
