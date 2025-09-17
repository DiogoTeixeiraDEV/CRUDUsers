import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { AuthModule } from './modules/auth.module';
import { PrismaModule } from './modules/prisma.module';
import { ProductModule } from './modules/product.module';
import { CartModule } from './modules/cart.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    PrismaModule,
    ProductModule,
    CartModule
  ]
})
export class AppModule{}
