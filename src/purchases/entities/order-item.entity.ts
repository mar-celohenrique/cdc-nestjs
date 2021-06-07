import { Book } from '@/books/entities/book.entity';
import { Column, ManyToOne } from 'typeorm';

export class OrderItem {
    @ManyToOne(() => Book, { nullable: false })
    book: Book;

    @Column()
    quantity: number;

    getTotal(): number {
        return Number(this.quantity.toFixed(2)) * Number(this.book.price.toFixed(2));
    }
}
