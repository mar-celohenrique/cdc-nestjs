import { Book } from '@/books/entities/book.entity';
import { Column, ManyToOne, JoinColumn, Entity, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';
import { Exclude } from 'class-transformer';

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn({ type: 'int', name: 'book_id' })
    @ManyToOne(() => Book, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'book_id', referencedColumnName: 'id' }])
    book: Book;

    @PrimaryColumn({ type: 'int', name: 'order_id' })
    @ManyToOne(
        () => Order,
        order => order.items,
        { nullable: false, cascade: false },
    )
    @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
    @Exclude()
    order: Order;

    @Column({ name: 'quantity', nullable: false })
    quantity: number;

    @Column({ name: 'book_price', nullable: false })
    bookPrice: number;

    getTotal(): number {
        return Number(this.quantity.toFixed(2)) * Number(this.book.price.toFixed(2));
    }
}
