import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { BrandRepository } from '@models/index';
import { message } from '@common/index';
import { Types } from 'mongoose';

@Injectable()
export class BrandService {
  constructor(private readonly brandrepo: BrandRepository) {}
  async create(brand: Brand) {
    // check if brand exist
    const brandExist = await this.brandrepo.getOne({ slug: brand.slug });
    if (brandExist) {
      throw new ConflictException(message.Brand.alreadyExist);
    }
    return await this.brandrepo.create(brand);
  }

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: string | Types.ObjectId) {
    const brandExist = this.brandrepo.getOne({ _id: id });
    if (!brandExist) {
      throw new ConflictException(message.Brand.notFound);
    }
    return brandExist;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
