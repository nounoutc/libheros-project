import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateUserDto) {
    if (dto.password !== undefined && dto.email !== undefined && dto.name !== undefined) {

      const hashedPassword = await bcrypt.hash(dto?.password, 10);
      return this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
        },
      });
    }

  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
