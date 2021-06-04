import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { Country } from './entities/country.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Country])],
    controllers: [CountriesController],
    providers: [],
})
export class CountriesModule {}
