import { Purchase } from '@/purchases/entities/purchase.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Purchase, { nullable: false })
    @Exclude()
    purchase: Purchase;

    @Column(() => OrderItem)
    items: OrderItem[];

    totalEqualsTo(total: number): boolean {
        return JSON.stringify(total) === JSON.stringify(this.getTotal());
    }

    getTotal(): number {
        return this.items
            .map(item => item.getTotal())
            .reduce((previous, actual) => Number(previous.toFixed(2)) + Number(actual.toFixed(2)));
    }
}
