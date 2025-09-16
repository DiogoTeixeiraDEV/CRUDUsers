import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { PrismaModule } from './modules/prisma.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
  ]
})
export class AppModule{}
