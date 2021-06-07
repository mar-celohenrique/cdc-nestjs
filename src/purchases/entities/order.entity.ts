import { Purchase } from '@/purchases/entities/purchase.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Purchase, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'purchase_id', referencedColumnName: 'id' }])
    @Exclude()
    purchase: Purchase;

    @OneToMany(
        () => OrderItem,
        orderItem => orderItem.order,
        { cascade: true },
    )
    items: OrderItem[];

    totalEqualsTo(total: number): boolean {
        return JSON.stringify(Number(total.toFixed(2))) === JSON.stringify(this.getTotal());
    }

    getTotal(): number {
        return this.items
            .map(item => item.getTotal())
            .reduce((previous, actual) => Number(previous.toFixed(2)) + Number(actual.toFixed(2)));
    }
}
