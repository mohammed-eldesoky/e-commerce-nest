import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from '@modules/product/product.module';
import { Cart, CartRepository, cartSchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserMongoModule } from '@shared/index';
@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([{ name: Cart.name, schema: cartSchema }]),
    UserMongoModule
  ],

  controllers: [CartController],
  providers: [CartService, CartRepository,JwtService],
  exports: [CartService],
})
export class CartModule {}
