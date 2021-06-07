import { IsEmail, IsInt, IsNotEmpty, Validate, ValidateNested } from 'class-validator';
import { IsCPFOrCNPJ } from 'brazilian-class-validator';
import { ExistsValue } from '@/commons/validations/validations';
import { Country } from '@/countries/entities/country.entity';
import { State } from '@/states/entities/state.entity';
import { Purchase } from '../entities/purchase.entity';
import { findById } from '@/commons/repository/query-repository';
import { StateBelongsCountryValidator } from '@/commons/validations/validators/state-belongs-country.validator';
import { CreatePurchaseOrder } from '../types/create-purchase-order';
import { CreateOrderDto } from '@/purchases/dto/create-order.dto';
import { Type } from 'class-transformer';
import { Repository } from 'typeorm';
import { Coupon } from '@/coupons/entities/coupon.entity';

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

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateOrderDto)
    order: CreateOrderDto;

    @ExistsValue({ field: 'code', clazz: Coupon })
    couponCode: string;

    public async toModel(purchasesRepository: Repository<Purchase>): Promise<Purchase> {
        const country: Country = await findById(Country, this.countryId);

        const createOrder: CreatePurchaseOrder = await this.order.toModel();

        const purchase: Purchase = purchasesRepository.create(this);
        purchase.order = createOrder(purchase);
        purchase.country = country;

        if (this.stateId) {
            purchase.state = await findById(State, this.stateId);
        }

        return purchase;
    }
}
