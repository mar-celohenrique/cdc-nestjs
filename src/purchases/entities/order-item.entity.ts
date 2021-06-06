import { Book } from '@/books/entities/book.entity';
import { Column, ManyToOne } from 'typeorm';

export class OrderItem {
    @ManyToOne(() => Book)
    book: Book;

    @Column()
    quantity: number;
}
