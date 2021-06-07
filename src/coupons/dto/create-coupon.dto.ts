import { IsNotEmpty, IsInt, IsPositive, IsDate } from 'class-validator';
import { UniqueValue } from '@/commons/validations/validations';
import { Coupon } from '../entities/coupon.entity';
import { Type } from 'class-transformer';

export class CreateCouponDto {
    @IsNotEmpty()
    @UniqueValue({ field: 'code', clazz: Coupon })
    code: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    discount: number;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    expirationDate: Date;
}
