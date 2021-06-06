import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

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

    @ManyToOne(() => Country)
    country: Country;

    @ManyToOne(() => State)
    state: State;

    @OneToOne(() => Order)
    @JoinColumn()
    order: Order;
}
