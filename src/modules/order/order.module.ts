import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CartModule } from '@modules/cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Order,
  OrderRepository,
  OrderSchema,
  Product,
  ProductRepository,
  productSchema,
} from '@models/index';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';

@Module({
  imports: [
    UserMongoModule,
    CartModule,
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Product.name, schema: productSchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, JwtService, OrderRepository, ProductRepository],
})
export class OrderModule {}
