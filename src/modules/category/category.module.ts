import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Category, CategoryRepository, CategorySchema } from '@models/index';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryFactory } from './factory';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository, CategoryFactory,JwtService],
})
export class CategoryModule {}
