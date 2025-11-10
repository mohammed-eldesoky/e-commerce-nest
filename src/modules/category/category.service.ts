import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from '@models/index';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryrepo: CategoryRepository) {}
  async create(category: Category) {
    const categoryExist = await this.categoryrepo.getOne({
      slug: category.slug,
    });
    //  fail case category already exist
    if (categoryExist) {
      throw new ConflictException('Category already exist');
    }

    return await this.categoryrepo.create(category);
  }

  //________________________________________________________________

  findAll() {
    return `This action returns all category`;
  }

  async findOne(id: string) {
  const category = await this.categoryrepo.getOne({_id:id},{},{populate:[{path:'createdBy'},{path:'updatedBy'}]})
  if (!category) {
    throw new ConflictException('Category not found');
  }
  return category;
  }

async update(id: string, category:Category) {
const categoryExist = await this.categoryrepo.getOne({slug:category.slug,_id:{$ne:id}})

if (categoryExist) {
  throw new ConflictException('Category already exist');
}

return await this.categoryrepo.update({_id:id},category,{new:true})
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
