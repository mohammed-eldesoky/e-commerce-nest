import slugify from 'slugify';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from './../dto/create-product.dto';
import { Types } from 'mongoose';

export class ProductFactory {
  createProduct(createProductDto: CreateProductDto, user: any) {
    const product = new Product();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.slug = slugify(createProductDto.name, { lower: true });
    //ids
    product.categoryId = new Types.ObjectId(createProductDto.categoryId);
    product.brandId = new Types.ObjectId(createProductDto.brandId);
    product.createdBy = user._id;
    product.updatedBy = user._id;

    //number
    product.price = createProductDto.price;
    product.discountAmount = createProductDto.discountAmount;
    product.disCountType = createProductDto.disCountType;
    product.stock = createProductDto.stock;
    product.sold = 0;

    //specification
    product.colors = createProductDto.colors;
    product.sizes = createProductDto.sizes;

    return product;
  }
}
