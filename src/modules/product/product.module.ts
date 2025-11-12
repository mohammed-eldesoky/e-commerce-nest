import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';
import { ProductFactory } from './factory';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Brand,
  BrandRepository,
  brandSchema,
  Category,
  CategoryRepository,
  CategorySchema,
  Product,
  ProductRepository,
  productSchema,
} from '@models/index';
import { BrandModule } from '@modules/brand/brand.module';
import { CategoryModule } from '@modules/category/category.module';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }]),
    BrandModule,
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductFactory, JwtService, ProductRepository],
})
export class ProductModule {}
