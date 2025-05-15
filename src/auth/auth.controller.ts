import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { GetUser } from './decorators/get-user.decorator'; // Optional custom decorator

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<{ message: string }> {
    await this.authService.register(registerDto);
    return { message: 'Registration successful' };
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
    @GetUser() user: User,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }
}
