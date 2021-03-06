import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('coupon')
export class Coupon {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'code', unique: true })
    code: string;

    @Column({ name: 'discount' })
    discount: number;

    @Column({ name: 'expiration_date' })
    expirationDate: Date;

    isValid(): boolean {
        return this.expirationDate.getTime() > new Date().getTime();
    }
}
