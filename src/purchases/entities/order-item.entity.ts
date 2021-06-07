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
        { cascade: false },
    )
    @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
    @Exclude()
    order: Order;

    @Column()
    quantity: number;

    getTotal(): number {
        return Number(this.quantity.toFixed(2)) * Number(this.book.price.toFixed(2));
    }
}
