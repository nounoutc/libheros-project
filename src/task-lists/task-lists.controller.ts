import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Req } from '@nestjs/common';
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
  async create(@Req() req: Request, @Body(ValidationPipe) createTaskListDto: CreateTaskListDto): Promise<any> {
    const userId = req.user ? req.user['id'] : undefined; // Check for user
    return this.taskListsService.create(userId, createTaskListDto);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<any[]> {
    const userId = req.user ? req.user['id'] : undefined;  // Check for user.
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
  async update(@Param('id') id: string, @Body(ValidationPipe) updateTaskListDto: UpdateTaskListDto): Promise<any> {
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

// src/task-lists/task-lists.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class TaskListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createTaskListDto: CreateTaskListDto): Promise<any> {
    return this.prisma.taskList.create({
      data: {
        ...createTaskListDto,
        user: {
          connect: { id: userId },
        },
      },
    });
  }

  async findAll(userId: number): Promise<any[]> {
    return this.prisma.taskList.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id },
    });
    if (!taskList) {
      throw new NotFoundException(`Task list with ID ${id} not found`);
    }
    return taskList;
  }

  async update(id: number, updateTaskListDto: UpdateTaskListDto): Promise<any> {
    return this.prisma.taskList.update({
      where: { id },
      data: updateTaskListDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.taskList.delete({
      where: { id },
    });
  }

  async isOwner(userId: number, taskListId: number): Promise<boolean> {
    const taskList = await this.prisma.taskList.findUnique({
      where: { id: taskListId, userId: userId },
    });
    return !!taskList;
  }
}

// src/users/entities/user.entity.ts
// If using Prisma, this is part of schema.prisma
// If using TypeORM, this is the entity file


// Prisma schema.prisma definition:
model User {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  password  String
  firstName String
  lastName  String
  taskLists TaskList[]
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
