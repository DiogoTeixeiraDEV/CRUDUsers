import { Post, Delete, Body, UseGuards, Controller, Get, Req } from "@nestjs/common";
import { CartService } from "src/services/cart.services";
import { JwtGuard } from "src/middlewares/jwt.guard";
import { RolesGuard } from "src/middlewares/roles.guard";
import { Roles } from "src/middlewares/roles.decorator";

@UseGuards(JwtGuard,RolesGuard)
@Controller('cart')
export class CartController {
    constructor(private CartService : CartService) {}
    @Get()
    @Roles('USER', 'ADMIN')
    getCart(@Req() req){
        const userId = req.user.id;
        return this.CartService.getCart(userId);
    }

    @Post('add')
    @Roles('USER', 'ADMIN')
    addItemToCart(@Req() req, @Body() body: { productId: number; quantity: number }) {
        const userId = req.user.id;
        return this.CartService.addItemToCart(userId, body.productId, body.quantity);
    }

    @Delete('remove/:productId')
    @Roles('USER', 'ADMIN')
    removeItemFromCart(@Req() req, @Body() body: { productId: number }) {
        const userId = req.user.id;
        return this.CartService.removeItemFromCart(userId, body.productId);

    }

}