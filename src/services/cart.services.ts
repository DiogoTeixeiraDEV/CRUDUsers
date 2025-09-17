import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
@Injectable()
export class CartService {
    constructor( private prisma: PrismaService) {}  

    async createCart(userId: number) {
        return this.prisma.cart.create({
            data: { userId },
        });
    }
    async getCart(userId: number) {
        const cart = this.prisma.cart.findFirst({
            where : { userId },
            include: { 
                items: {
                    include: { product: true }
                }
            }
        });
    

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    async addItemToCart(userId: number, productId: number, quantity: number) {
        let cart = await this.prisma.cart.findFirst({ 
            where: { userId }
        });

        if (!cart) {
            cart = await this.createCart(userId);
        }

        const itemExists = await this.prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId }
        });

        if (itemExists) {
            return this.prisma.cartItem.update({
                where: { id: itemExists.id },
                data: { quantity: itemExists.quantity + quantity }
            });
        }

        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity
            }
        });
    }

    async updateItemQuantity(userId: number, productId: number, quantity: number) {
        const cart = await this.prisma.cart.findFirst({ where: { userId } });
        if (!cart) throw new NotFoundException('Cart not found');
      
        const item = await this.prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
        if (!item) throw new NotFoundException('Item not found in cart');

        return this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity }
        });
    }

    async removeItemFromCart(userId: number, productId: number) {
        const cart = await this.prisma.cart.findFirst({ where: { userId } });
        if (!cart) throw new NotFoundException('Cart not found');

        const item = await this.prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
        if (!item) throw new NotFoundException('Item not found in cart');

        return this.prisma.cartItem.delete({ where: { id: item.id } }); 
    }

    async clearCart(userId: number) {
        const cart = await this.prisma.cart.findFirst({ where: { userId } });
        if (!cart) throw new NotFoundException('Cart not found');

        return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
}
