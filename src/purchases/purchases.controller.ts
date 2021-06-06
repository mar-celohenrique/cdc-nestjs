import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Controller('purchases')
export class PurchasesController {
    constructor(
        @InjectRepository(Purchase)
        private readonly purchasesRepository: Repository<Purchase>,
    ) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        const purchase: Purchase = await createPurchaseDto.toModel();
        return purchase;
    }
}
