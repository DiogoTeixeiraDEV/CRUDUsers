import { Module } from '@nestjs/common';
import { AuthController } from 'src/controllers/auth.controller';
import { AuthService } from 'src/services/auth.services';
import { JwtModule} from '@nestjs/jwt';
import { UsersModule } from './users.module';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';


@Module({
  imports: [UsersModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  })],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy ],
})
export class AuthModule {}
