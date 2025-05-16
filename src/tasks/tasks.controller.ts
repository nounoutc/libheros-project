import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto, @Request() req) {
    return this.tasksService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Request() req) {
    return this.tasksService.findAll(req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.tasksService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Request() req,
  ) {
    return this.tasksService.update(+id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.tasksService.remove(+id, req.user.userId);
  }
}
