import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateTaskDto, userId: number) {
    if (dto.taskListId !== undefined) {
      const taskList = await this.prisma.taskList.findFirst({
        where: { id: dto.taskListId, userId },
      });
      if (!taskList) {
        throw new NotFoundException('Task list not found or unauthorized');
      }
    }

    const data: any = {
      title: dto.title,
      completed: dto.completed ?? false,
    };

    if (dto.taskListId !== undefined) {
      data.taskList = {
        connect: { id: dto.taskListId },
      };
    }

    return this.prisma.task.create({ data });
  }



  async findAll(userId: number) {
    return this.prisma.task.findMany({
      where: {
        taskList: {
          userId,
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const task = await this.prisma.task.findFirst({
      where: {
        id,
        taskList: {
          userId,
        },
      },
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    const task = await this.findOne(id, userId);

    if (dto.taskListId && dto.taskListId !== task.taskListId) {
      // Vérifie la propriété de la nouvelle taskList
      const newTaskList = await this.prisma.taskList.findFirst({
        where: { id: dto.taskListId, userId },
      });
      if (!newTaskList) {
        throw new NotFoundException('New Task list not found or unauthorized');
      }
    }

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId); // vérifie existence et propriété
    return this.prisma.task.delete({ where: { id } });
  }
}
