import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './../dto/create-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryFactory {
  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();

    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }); // 2 parameters (name, options)
    category.createdBy = user._id;
    category.logo = createCategoryDto.logo;
    return category;
  }
}
