import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorsModule } from './authors/authors.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';

@Module({
    imports: [TypeOrmModule.forRoot(), AuthorsModule, CategoriesModule, BooksModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
