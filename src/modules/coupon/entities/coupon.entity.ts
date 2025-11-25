import { discountType } from '@common/enum';
import { UsedBy } from '@models/index';
import { Types } from 'mongoose';

export class Coupon {
  readonly _id: Types.ObjectId;

  code: string;

  discountAmount: number;

  discountType: discountType;

  fromtDate: Date;

  toDate: Date;
  createdBy: Types.ObjectId;

  updatedBy: Types.ObjectId;

  active: boolean;

  usedBy: UsedBy[];

  assignedTo: UsedBy[];
}
