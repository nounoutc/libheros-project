import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class TaskListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, dto: CreateTaskListDto) {
    const exists = await this.prisma.taskList.findFirst({
      where: { userId, name: dto.name },
    });

    if (exists) {
      throw new ConflictException('A task list with this name already exists');
    }

    return this.prisma.taskList.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.taskList.findMany({
      where: { userId },
      include: { tasks: true },
    });
  }

  async update(id: number, dto: UpdateTaskListDto) {
    return this.prisma.taskList.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.taskList.delete({ where: { id } });
  }
}
