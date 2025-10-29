import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from '@shared/index';


@Module({imports: [UserMongoModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
