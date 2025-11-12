import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';
import { ProductFactory } from './factory';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductRepository, productSchema } from '@models/index';


@Module({imports: [UserMongoModule,MongooseModule.forFeature([{ name: Product.name, schema: productSchema }])],
  controllers: [ProductController],
  providers: [ProductService,ProductFactory,JwtService,ProductRepository],
})
export class ProductModule {}
