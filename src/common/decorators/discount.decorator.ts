import { discountType } from '@common/enum';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsValidDiscount(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidDiscount',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { DiscountType } = obj;
          if (DiscountType === discountType.percentage) {
            return typeof value === 'number' && value > 0 && value <= 100;
          }

          if (DiscountType === discountType.fixed_amount) {
            return typeof value === 'number' && value >= 0;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const { DiscountType } = obj;
          if (DiscountType === discountType.percentage) {
            return 'Discount amount cannot exceed 100 when discount type is percentage';
          }

          if (DiscountType === discountType.fixed_amount) {
            return 'Discount amount must be a valid positive number';
          }
          return 'Invalid Discount Amount';
        },
      },
    });
  };
}
