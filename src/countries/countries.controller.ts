import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { Country } from './entities/country.entity';

@Controller('countries')
export class CountriesController {
    constructor(
        @InjectRepository(Country)
        private readonly countriesRepository: Repository<Country>,
    ) {}

    @Post()
    async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
        const country: Country = this.countriesRepository.create(createCountryDto);
        await this.countriesRepository.save(country);
        return country;
    }
}
