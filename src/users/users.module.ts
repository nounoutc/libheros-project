import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { PrismaService } from '../prisma/prisma.service'; // If using Prisma
import { TypeOrmModule } from '@nestjs/typeorm'; // If using TypeORM
import { User } from './entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]), // If using TypeORM
  ],
  controllers: [UsersController],
  providers: [UsersService /*PrismaService*/], // If using Prisma, inject it.
  exports: [UsersService], // Export UsersService so it can be used by other modules (e.g., AuthService)
})
export class UsersModule {}
