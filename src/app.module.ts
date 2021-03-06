import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { PurchasesModule } from './purchases/purchases.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        AuthorsModule,
        CategoriesModule,
        BooksModule,
        CountriesModule,
        StatesModule,
        PurchasesModule,
        CouponsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
