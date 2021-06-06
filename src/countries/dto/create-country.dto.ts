import { UniqueValue } from '@/commons/validations/validations';
import { IsNotEmpty } from 'class-validator';
import { Country } from '../entities/country.entity';

export class CreateCountryDto {
    @IsNotEmpty()
    @UniqueValue({ field: 'name', clazz: Country })
    name: string;
}
