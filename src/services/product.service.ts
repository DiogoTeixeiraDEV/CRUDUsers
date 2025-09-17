import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";



@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService ) {}

    async createProduct(name: string, category: string, stock: number) {
        const product = await this.prisma.product.create({
            data: {
                name,
                category,
                stock
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

    async updateProduct(id: number, data : Partial<{ name?: string; category?: string; stock?: number }>) {
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