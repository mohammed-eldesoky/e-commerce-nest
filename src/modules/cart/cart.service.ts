import { Injectable, NotFoundException } from '@nestjs/common';
import { AddToCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository, ProductRepository } from '@models/index';
import { ProductService } from '@modules/product/product.service';
import { message } from '@common/index';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductService,
  ) {}
  //Create new cart

  async createCart(user: any, addToCartDto: AddToCartDto) {
    // Create new cart
    const cart = await this.cartRepository.create({
      userId: user._id,
      products: [
        {
          productId: addToCartDto.productId,
          quantity: addToCartDto.quantity,
        },
      ],
    });
    return cart;
  }

  async addToCart(addToCartDto: AddToCartDto, user: any) {
    // Check if product exists
    const productExist = await this.productService.findOne(
      addToCartDto.productId.toString(),
    );

    const cart = await this.cartRepository.getOne({ userId: user._id });
    if (!cart) {
      return await this.createCart(user, addToCartDto);
    }

    // Check if product already exists in cart
    const productIndex = cart.products.findIndex((product) =>
      product.productId.equals(addToCartDto.productId),
    ); //if exist return index else -1

    if (productIndex === -1) {
      cart.products.push({
        productId: addToCartDto.productId,
        quantity: addToCartDto.quantity,
      });
    } else {
      // Update quantity
      cart.products[productIndex].quantity += addToCartDto.quantity;
    }
    // Save cart in database
    await cart.save();
    return cart;
  }

  async removeFromCart(productId: string, user: any) {
    const product = await this.cartRepository.update(
      { userId: user._id, 'products.productId': productId }, //
      { $pull: { products: { productId } } },
    );
    if (!product) 
      throw new NotFoundException(message.cart.notFound);

    return true;
  }
}
