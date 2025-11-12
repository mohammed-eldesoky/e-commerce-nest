import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  BrandRepository,
  CategoryRepository,
  ProductRepository,
} from '@models/index';
import { Product } from './entities/product.entity';
import { BrandModule } from '@modules/brand/brand.module';
import { BrandService } from '@modules/brand/brand.service';
import { CategoryService } from '@modules/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productrepo: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product) {
    // check if product exist>> if category and brand exist
await this.categoryService.findOne(product.categoryId.toString());
await this.brandService.findOne(product.brandId.toString());

return await this.productrepo.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
