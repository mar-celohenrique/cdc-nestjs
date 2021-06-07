import { Controller, Post, Body } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('coupons')
export class CouponsController {
    constructor(
        @InjectRepository(Coupon)
        private readonly couponsRepository: Repository<Coupon>,
    ) {}

    @Post()
    async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
        const coupon = this.couponsRepository.create(createCouponDto);
        await this.couponsRepository.save(coupon);
        return coupon;
    }
}
