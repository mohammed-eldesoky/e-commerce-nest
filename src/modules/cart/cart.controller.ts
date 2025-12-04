import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/create-cart.dto';
import { User } from '@common/decorators/user.decorator';
import { message } from '@common/index';
import { Auth } from '@common/decorators/auth.decorator';

@Controller('cart')
@Auth(['Admin', 'Customer'])
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async addToCart(@Body() createCartDto: AddToCartDto, @User() user: any) {
    const cart = await this.cartService.addToCart(createCartDto, user);
    return {
      success: true,
      message:  message.cart.updated,
      data: cart,
    };
  }

  @Put('/:productId')
  async removeFromCart(@Param('productId') productId: string, @User() user: any) {
    await this.cartService.removeFromCart(productId, user);
   return{
      success: true,
      message: message.cart.updated,

   }
  }
}
