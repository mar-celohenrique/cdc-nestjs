import { findById } from '@/commons/repository/query-repository';
import { ExistsValue, UniqueValue } from '@/commons/validations/validations';
import { Country } from '@/countries/entities/country.entity';
import { IsInt, IsNotEmpty } from 'class-validator';
import { State } from '../entities/state.entity';

export class CreateStateDto {
    @IsNotEmpty()
    @UniqueValue({ field: 'name', clazz: State })
    name: string;

    @IsInt()
    @IsNotEmpty()
    @ExistsValue({ field: 'id', clazz: Country })
    countryId: number;

    async toModel(): Promise<State> {
        const country: Country = await findById(Country, this.countryId);
        return new State(this.name, country);
    }
}
