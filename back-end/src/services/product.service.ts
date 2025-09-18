import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { createProductDto } from "src/dto/create-product.dto";



@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService ) {}

    async createProduct(dto: createProductDto) {
        const product = await this.prisma.product.create({
            data: {
                name : dto.name,
                category: dto.category,
                price: dto.Price,
                stock: dto.stock,
        }
        })
        return product;
    }

    async listProduct(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id }
        });
        return product;
    }    
    
    async getAllProducts() {
        return await this.prisma.product.findMany();
    }

    async updateProduct(id: number, data : Partial<{ dto: createProductDto }>) {
        const updatedProduct = await this.prisma.product.update({
            where: { id },
            data,
        });
        return updatedProduct;
    }
    
    async deleteProduct(id: number) {
        await this.prisma.product.delete({
            where: { id },
        });
    }
}