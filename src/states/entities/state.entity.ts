import { Country } from '@/countries/entities/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class State {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @ManyToOne(() => Country, { nullable: false })
    country: Country;

    belongsToCountry(country: Country): boolean {
        return JSON.stringify(this.country) === JSON.stringify(country);
    }
}
