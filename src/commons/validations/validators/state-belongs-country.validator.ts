import { findById } from '@/commons/repository/query-repository';
import { Country } from '@/countries/entities/country.entity';
import { CreatePurchaseDto } from '@/purchases/dto/create-purchase.dto';
import { State } from '@/states/entities/state.entity';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'StateBelongsCountry', async: true })
export class StateBelongsCountryValidator implements ValidatorConstraintInterface {
    async validate(value: number, args: ValidationArguments) {
        if (!value) {
            return true;
        }

        try {
            const purchaseDTO: CreatePurchaseDto = args.object as CreatePurchaseDto;
            const country: Country = await findById(Country, purchaseDTO.countryId);
            const state: State = await findById(State, value, ['country']);

            return !(!state || !state.belongsToCountry(country));
        } catch (ex) {
            return false;
        }
    }

    defaultMessage(args: ValidationArguments) {
        return `The state [${args.value}] does not belong to the country`;
    }
}
