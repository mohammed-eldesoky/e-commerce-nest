import { Injectable, NotFoundException } from '@nestjs/common';
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
import { threadId } from 'worker_threads';
import { message } from '@common/index';

@Injectable()
export class ProductService {
  constructor(
    private readonly productrepo: ProductRepository,
    private readonly categoryService: CategoryService,
    private readonly brandService: BrandService,
  ) {}
  async create(product: Product, user: any) {
    // check if product exist>> if category and brand exist
    await this.categoryService.findOne(product.categoryId.toString());
    await this.brandService.findOne(product.brandId.toString());
    //if product exist >> update
    const productExist = await this.productrepo.getOne({
      slug: product.slug,
      $or: [{ createdBy: user._id }, { updatedBy: user._id }],
    });
    if (productExist) {
      return await this.update(productExist._id.toString(), product);
    }
    return await this.productrepo.create(product);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update(id: string, product: Product) {
    //check if product exist
    const productExist = await this.productrepo.getOne({ _id: id });
    //fail case
    if (!productExist) {
      throw new NotFoundException(message.product.notFound);
    }
    //modify some fields before update product
    product.stock += productExist.stock;

    // if new colors  = old colors don't change & but if defrent update it
    const colors = new Set<string>(productExist.colors);
    for (const color of product.colors) {
      colors.add(color);
    }
    product.colors = Array.from(colors);
    //if new sizes  = old sizes don't change & but if defrent update it
    const sizes = new Set<string>(productExist.sizes);
    for (const size of product.sizes) {
      sizes.add(size);
    }
    product.sizes = Array.from(sizes);
    //update product
    return await this.productrepo.update({ _id: id }, product, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
