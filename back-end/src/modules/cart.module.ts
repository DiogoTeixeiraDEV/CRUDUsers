import { Module } from "@nestjs/common";
import { CartService } from "src/services/cart.services";
import { CartController } from "src/controllers/cart.controller";
import { PrismaService } from "src/services/prisma.service";
import { ProductModule } from "./product.module";

@Module({
    imports: [ProductModule],
    controllers: [CartController],  
    providers: [CartService, PrismaService],
    exports: [CartService]
})
export class CartModule {}