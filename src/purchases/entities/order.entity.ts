import { Purchase } from '@/purchases/entities/purchase.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Purchase)
    @Exclude()
    purchase: Purchase;

    @Column(() => OrderItem)
    items: Set<OrderItem>;
}
