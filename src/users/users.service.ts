import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {}
import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service'; // If using Prisma
import { InjectRepository } from '@nestjs/typeorm'; // If using TypeORM
import { Repository } from 'typeorm'; // If using TypeORM
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    // private readonly prisma: PrismaService, // If using Prisma
    @InjectRepository(User) private readonly userRepository: Repository<User>, // If using TypeORM
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // If using Prisma:
    // return this.prisma.user.create({
    //   data: {
    //     email: createUserDto.email,
    //     password: createUserDto.password,
    //     firstName: createUserDto.firstName,
    //     lastName: createUserDto.lastName,
    //   },
    // });

    // If using TypeORM:
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    // If using Prisma:
    // return this.prisma.user.findUnique({
    //   where: { email },
    // });

    // If using TypeORM:
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    // If using Prisma:
    // return this.prisma.user.findUnique({
    //   where: { id },
    // });

    // If using TypeORM:
    return this.userRepository.findOne({ where: { id } });
  }

  //  We don't need the other CRUD operations.
  // async findAll(): Promise<User[]> {
  //   // If using Prisma:
  //   // return this.prisma.user.findMany();

  //   // If using TypeORM:
  //   return this.userRepository.find();
  // }

  // async findOne(id: number): Promise<User | null> {
  //   // If using Prisma:
  //   // return this.prisma.user.findUnique({
  //   //   where: { id },
  //   // });

  //   // If using TypeORM:
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   // If using Prisma:
  //   // return this.prisma.user.update({
  //   //   where: { id },
  //   //   data: updateUserDto,
  //   // });

  //   // If using TypeORM:
  //   await this.userRepository.update(id, updateUserDto);
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async remove(id: number): Promise<void> {
  //   // If using Prisma:
  //   // await this.prisma.user.delete({
  //   //   where: { id },
  //   // });

  //   // If using TypeORM:
  //   await this.userRepository.delete(id);
  // }
}
