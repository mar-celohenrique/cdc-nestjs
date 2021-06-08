import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Coupon } from '@/coupons/entities/coupon.entity';
import { Assert } from '@/commons/assertions';

@Entity('purchase')
export class Purchase {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'email', nullable: false })
    email: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'last_name', nullable: false })
    lastName: string;

    @Column({ name: 'document', nullable: false })
    document: string;

    @Column({ name: 'address', nullable: false })
    address: string;

    @Column({ name: 'complement', nullable: false })
    complement: string;

    @Column({ name: 'city', nullable: false })
    city: string;

    @Column({ name: 'phone', nullable: false })
    phone: string;

    @Column({ name: 'zip_code', nullable: false })
    zipCode: string;

    @Column({ name: 'discount', nullable: true })
    discount: number;

    @Column({ name: 'expiration_date', nullable: true })
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

    applyCoupon(couponToApply: Coupon): void {
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

    getAddressFormatted(): string {
        return `${this.address} ${this.complement}, ${this.city} - ${this.zipCode}, ${this.country.name}. ${this.phone}`;
    }
}
