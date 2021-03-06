import { Book } from '@/books/entities/book.entity';
import { findById } from '@/commons/repository/query-repository';
import { ExistsValue } from '@/commons/validations/validations';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderItemDto {
    @IsNotEmpty()
    @IsInt()
    @ExistsValue({ field: 'id', clazz: Book })
    bookId: number;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    quantity: number;

    async toModel(): Promise<OrderItem> {
        const book: Book = await findById(Book, this.bookId);
        const orderItem = new OrderItem();
        orderItem.book = book;
        orderItem.quantity = this.quantity;
        orderItem.bookPrice = book.price;
        return orderItem;
    }
}
