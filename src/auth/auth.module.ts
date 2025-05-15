import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import the UsersModule to access the UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy'; // If implementing local strategy
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Load JWT secret from environment variables
        signOptions: { expiresIn: '1h' }, // Example token expiration time
      }),
    }),
    ConfigModule, // Ensure ConfigModule is imported if not globally
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy], // Register your services and strategies
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService if other modules need it (e.g., for guards)
})
export class AuthModule {}
