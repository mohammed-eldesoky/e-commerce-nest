import { discountType } from '@models/index';
import { Types } from 'mongoose';

export class Product {
  //______________________string_______________________//

  name: string;

  description: string;

  slug: string;

  categoryId: Types.ObjectId;

  brandId: Types.ObjectId;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;

  //______________________number_______________________//

  price: number;

  discountAmount: number;

  disCountType: discountType;

  finalPrice: number; // virtual

  stock: number;

  sold: number;

  //______________________specification_______________________//

  colors: string[];

  sizes: string[];
}
