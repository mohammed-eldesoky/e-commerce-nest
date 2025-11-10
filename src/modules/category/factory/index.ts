import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from './../dto/create-category.dto';
import slugify from 'slugify';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryService } from '../category.service';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryFactory {
  constructor(private readonly categoryRepo: CategoryRepository) {}
  createCategory(createCategoryDto: CreateCategoryDto, user: any) {
    const category = new Category();

    category.name = createCategoryDto.name;
    category.slug = slugify(createCategoryDto.name, {
      replacement: '-',
      lower: true,
      trim: true,
    }); // 2 parameters (name, options)
    category.createdBy = user._id;
    category.updatedBy = user._id;
    category.logo = createCategoryDto.logo;
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto ,user: any) {
    const oldCategory = await this.categoryRepo.getOne({ _id: id });
    if (!oldCategory) {
      throw new NotFoundException('Category not found');
    }
    const category = new Category();
    const newName = updateCategoryDto.name || oldCategory.name;
    const newLogo = updateCategoryDto.logo || oldCategory.logo;
    category.name = newName;
    category.slug = slugify(newName, {
      replacement: '-',
      lower: true,
      trim: true,
    }); // 2 parameters (name, options)
    category.logo = category.logo||newLogo;
    category.updatedBy = user._id;
    return category;
  }
}
