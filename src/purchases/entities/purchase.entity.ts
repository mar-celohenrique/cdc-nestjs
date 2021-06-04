import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

    constructor(
        email: string,
        name: string,
        lastName: string,
        document: string,
        address: string,
        complement: string,
        city: string,
        phone: string,
        zipCode: string,
        country: Country,
    ) {
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.document = document;
        this.address = address;
        this.complement = complement;
        this.city = city;
        this.phone = phone;
        this.zipCode = zipCode;
        this.country = country;
    }
}
