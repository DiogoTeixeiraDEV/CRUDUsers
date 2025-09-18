import { Controller, Post, Get, Delete, Body, UseGuards } from "@nestjs/common";
import { ProductService } from "src/services/product.service";
import { createProductDto } from "src/dto/create-product.dto";
import { JwtGuard } from "src/middlewares/jwt.guard";
import { RolesGuard } from "src/middlewares/roles.guard";
import { Roles } from "src/middlewares/roles.decorator";

@UseGuards(JwtGuard,RolesGuard)
@Controller('products')
export class ProductController {
    constructor(private ProductService : ProductService) {}

    @Post()
    @Roles('ADMIN')
    createProduct(@Body() dto: createProductDto) {
        return this.ProductService.createProduct(dto);
    }

    @Get()
    @Roles('USER', 'ADMIN')
    getAllProducts() {
        return this.ProductService.getAllProducts();
    }

    @Get(':id')
    @Roles('ADMIN')
    getProduct(id: number) {
        return this.ProductService.listProduct(id);
    }

    @Post(':id')
    @Roles('ADMIN')
    updateProduct(id: number, @Body() data : Partial<{ dto: createProductDto }>) {
        return this.ProductService.updateProduct(id, data);
    }

    @Delete(':id')
    @Roles('ADMIN')
    deleteProduct(id: number) {
        return this.ProductService.deleteProduct(id);
    }
}
