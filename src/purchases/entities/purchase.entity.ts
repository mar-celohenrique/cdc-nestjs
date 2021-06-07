import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Coupon } from '@/coupons/entities/coupon.entity';
import { Assert } from '@/commons/assertions';

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

    @Column({
        nullable: true,
    })
    discount: number;

    @Column({ nullable: true })
    expirationDate: Date;

    @ManyToOne(() => Country, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
    country: Country;

    @ManyToOne(() => State, { nullable: false, cascade: false })
    @JoinColumn([{ name: 'state_id', referencedColumnName: 'id' }])
    state: State;

    @OneToOne(() => Order, { nullable: false, cascade: true })
    order: Order;

    @ManyToOne(() => Coupon, { nullable: true })
    @JoinColumn([{ name: 'coupon_id', referencedColumnName: 'id' }])
    coupon: Coupon;

    public applyCoupon(couponToApply: Coupon): void {
        Assert.notNull(couponToApply, 'The coupon must not be null');
        Assert.isTrue(couponToApply.isValid(), 'The coupon is not valid');
        Assert.isNull(this.coupon, 'Is not possible to change a coupon from a Purchase');
        Assert.isNull(this.id, 'Is not possible to apply a coupon on a Purchase that was already created');
        Assert.isNull(this.expirationDate, 'Is not possible to apply a coupon on a Purchase that was already created');
        Assert.isNull(this.discount, 'Is not possible to apply a coupon on a Purchase that was already created');
        this.coupon = couponToApply;
        this.expirationDate = couponToApply.expirationDate;
        this.discount = couponToApply.discount;
    }

    public getAddressFormatted(): string {
        return `${this.address} ${this.complement}, ${this.city} - ${this.zipCode}, ${this.country.name}. ${this.phone}`;
    }
}
