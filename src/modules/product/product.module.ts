import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserMongoModule } from 'src/shared/modules/user.mongo.module';

@Module({imports: [UserMongoModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
