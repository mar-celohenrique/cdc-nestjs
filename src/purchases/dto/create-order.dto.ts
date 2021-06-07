import { Order } from '../entities/order.entity';
import { CreatePurchaseOrder } from '../types/create-purchase-order';
import { Purchase } from '@/purchases/entities/purchase.entity';
import { CreateOrderItemDto } from './create-order-item.dto';
import { ArrayMinSize, IsInt, IsNotEmpty, IsPositive, ValidateNested, IsArray } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';
import { Type } from 'class-transformer';
import { Assert } from '@/commons/assertions';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    total: number;

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested()
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];

    public async toModel(): Promise<CreatePurchaseOrder> {
        const orderItems: OrderItem[] = await Promise.all(this.items.map(item => item.toModel()));

        return (purchase: Purchase) => {
            const order = new Order();
            order.purchase = purchase;
            order.items = orderItems;
            Assert.isTrue(
                order.totalEqualsTo(this.total),
                'The total that was sent does not match with the real total',
            );
            return order;
        };
    }
}
