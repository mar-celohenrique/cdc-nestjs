import { Country } from '@/countries/entities/country.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('state')
export class State {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name', nullable: false, unique: true })
    name: string;

    @ManyToOne(() => Country, { nullable: false })
    @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
    country: Country;

    belongsToCountry(country: Country): boolean {
        return JSON.stringify(this.country) === JSON.stringify(country);
    }
}
