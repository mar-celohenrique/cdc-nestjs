import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
    HttpStatus,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { PurchaseDetailsDto } from './dto/purchase-details.dto';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Book } from '@/books/entities/book.entity';

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
        const purchase: Purchase = await createPurchaseDto.toModel(this.purchasesRepository);
        await this.purchasesRepository.save(purchase);
        return purchase;
    }

    @Get(':id')
    async purchaseDetails(@Param('id', ParseIntPipe) id: number): Promise<PurchaseDetailsDto> {
        const purchase: Purchase = await this.purchasesRepository
            .createQueryBuilder('purchase')
            .innerJoinAndSelect('purchase.country', 'country')
            .innerJoinAndMapOne('purchase.order', Order, 'order', 'order.purchase_id = purchase.id')
            .innerJoinAndMapMany('order.items', OrderItem, 'order_item', 'order_item.order_id = order.id')
            .innerJoinAndMapOne('order_item.book', Book, 'book', 'order_item.book_id = book.id')
            .where('purchase.id = :id', { id })
            .getOne();

        if (!purchase) {
            throw new NotFoundException();
        }

        return new PurchaseDetailsDto(purchase);
    }
}
