import { Module } from "@nestjs/common";
import { ProductService } from "src/services/product.service";
import { ProductController } from "src/controllers/product.controller";


    @Module({
        imports: [],
        controllers: [ProductController],
        providers: [ProductService],
        exports: [ProductService],
      })
export class ProductModule {
}