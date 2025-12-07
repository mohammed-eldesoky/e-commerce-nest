import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository, ProductRepository } from '@models/index';
import { CartService } from '@modules/cart/cart.service';
import { Types } from 'mongoose';
import { UpdateBrandDto } from './../brand/dto/update-brand.dto';
import { threadId } from 'worker_threads';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly cartService: CartService,
    private readonly productRepository: ProductRepository,
  ) {}
  async create(createOrderDto: CreateOrderDto, user: any) {
    const cart = await this.cartService.findOne(user);
    if (cart.products.length == 0) {
      throw new NotFoundException('Cart is empty');
    }
    const failProducts: { productId: Types.ObjectId; reason: string }[] = [];
    const successProducts: {
      productId: Types.ObjectId;
      quantity: number;
      price: number;
      discount: number;
      totalPrice: number;
      name: string;
    }[] = [];

    for (const product of cart.products) {
      const productExist = await this.productRepository.getOne({
        _id: product.productId,
      });
      if (!productExist) {
        failProducts.push({
          productId: product.productId,
          reason: 'Product not found',
        });
        continue;
      }
      if (productExist.stock < product.quantity) {
        failProducts.push({
          productId: product.productId,
          reason: 'Not enough stock',
        });
        continue;
      }
      successProducts.push({
        productId: product.productId,
        quantity: product.quantity,
        price: productExist.finalPrice,
        discount: productExist.discountAmount,
        totalPrice: productExist.finalPrice * product.quantity,
        name: productExist.name,
      });
    }
    if (failProducts.length > 0) {
      return {
        success: false,
        message: 'Some products are not available',
        failProducts,
      };
    }
    // CREATE ORDER
    const order = await this.orderRepository.create({
      userId: user._id,
      products: successProducts,
      address: createOrderDto.address,
      paymentMethod: createOrderDto.paymentMethod,
      coupon: createOrderDto.couponDetails,
      totalAmount: successProducts.reduce(
        (acc, cur) => acc + cur.totalPrice,
        0,
      ), // acc
    });
    // CLEAR CART
    await this.cartService.clearCart(user);
    return order;
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
