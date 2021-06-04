import { Country } from '@/countries/entities/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @ManyToOne(() => Country)
    country: Country;

    constructor(name: string, country: Country) {
        this.name = name;
        this.country = country;
    }
}
