import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from '@/purchases/entities/purchase.entity';

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'code', unique: true })
    code: string;

    @Column({ name: 'discount' })
    discount: number;

    @Column({ name: 'expiration_date' })
    expirationDate: Date;

    @OneToMany(
        () => Purchase,
        purchase => purchase.coupon,
    )
    purchases: Purchase[];
}
