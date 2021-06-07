import { Module } from '@nestjs/common';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Coupon])],
    controllers: [CouponsController],
    providers: [],
})
export class CouponsModule {}
