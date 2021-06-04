import { IsEmail, IsInt, IsNotEmpty, Validate } from 'class-validator';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { ExistsValue } from '@/commons/validations/validations';
import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Purchase } from '../entities/purchase.entity';
import { findById } from '@/commons/repository/query-repository';
import { StateBelongsCountryValidator } from '@/commons/validations/validators/state-belongs-country.validator';

export class CreatePurchaseDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    lastName: string;

    @IsCPFOrCNPJ()
    document: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    complement: string;

    @IsNotEmpty()
    city: string;

    @IsInt()
    @IsNotEmpty()
    @ExistsValue({ field: 'id', clazz: Country })
    countryId: number;

    @ExistsValue({ field: 'id', clazz: State })
    @Validate(StateBelongsCountryValidator)
    stateId: number;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    zipCode: string;

    async toModel(): Promise<Purchase> {
        const country: Country = await findById(Country, this.countryId);
        const purchase: Purchase = new Purchase(
            this.email,
            this.name,
            this.lastName,
            this.document,
            this.address,
            this.complement,
            this.city,
            this.phone,
            this.zipCode,
            country,
        );

        if (this.stateId) {
            purchase.state = await findById(State, this.stateId);
        }

        return purchase;
    }
}
