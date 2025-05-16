import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, firstName, lastName } = createUserDto; // Destructure
    return this.prisma.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
  }

  async findByEmail(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  async findById(id: number): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
