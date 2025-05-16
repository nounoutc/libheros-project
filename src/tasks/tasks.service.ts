import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto'; // Import DTO
import { UpdateTaskDto } from './dto/update-task.dto'; // Import DTO

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(taskListId: number, createTaskDto: CreateTaskDto): Promise<any> {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        taskListId: taskListId,
      },
    });
  }

  async findAll(taskListId: number): Promise<any[]> {
    return this.prisma.task.findMany({
      where: {
        taskListId: taskListId,
      },
    });
  }

  async findOne(id: number): Promise<any> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<any> {
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
