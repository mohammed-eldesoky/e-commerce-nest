import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminRepository,
  adminSchema,
  Customer,
  CustomerRepository,
  customerSchema,
  Seller,
  SellerRepository,
  sellerSchema,
  User,
  userSchema,
} from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
        discriminators: [
          { name: Admin.name, schema: adminSchema },
          { name: Seller.name, schema: sellerSchema },
          { name: Customer.name, schema: customerSchema },
        ],
      },
    ]),
  ],
  controllers: [],
  providers: [SellerRepository, AdminRepository, CustomerRepository],
  exports: [SellerRepository, AdminRepository, CustomerRepository],
})
export class UserMongoModule {}
