import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Coupon } from '@/coupons/entities/coupon.entity';

@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    document: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    complement: string;

    @Column({ nullable: false })
    city: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false })
    zipCode: string;

    @ManyToOne(() => Country, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
    country: Country;

    @ManyToOne(() => State, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'state_id', referencedColumnName: 'id' }])
    state: State;

    @OneToOne(() => Order, { nullable: false, cascade: true })
    order: Order;

    @ManyToOne(
        () => Coupon,
        coupon => coupon.purchases,
    )
    @JoinColumn([{ name: 'coupon_id', referencedColumnName: 'id' }])
    coupon: Coupon;
}
