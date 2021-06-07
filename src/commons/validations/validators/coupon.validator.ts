import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';
import { Coupon } from '@/coupons/entities/coupon.entity';

@ValidatorConstraint({ name: 'Coupon', async: true })
export class CouponValidator implements ValidatorConstraintInterface {
    async validate(value: string) {
        if (!value) {
            return true;
        }

        try {
            const coupon: Coupon = await getConnection()
                .getRepository(Coupon)
                .findOneOrFail({ where: { code: value } });

            return coupon.isValid();
        } catch (ex) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `This coupon [${args.value}] is not valid`;
    }
}
