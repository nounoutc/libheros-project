import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';

@Injectable()
export class TaskListsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: number,
    createTaskListDto: CreateTaskListDto,
  ): Promise<any> {
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
