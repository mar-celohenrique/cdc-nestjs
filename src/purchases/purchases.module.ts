import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchasesController } from './purchases.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Purchase])],
    controllers: [PurchasesController],
    providers: [],
})
export class PurchasesModule {}
