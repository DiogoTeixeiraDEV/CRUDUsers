import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from './users.module';

@Module({
  imports: [UsersModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
