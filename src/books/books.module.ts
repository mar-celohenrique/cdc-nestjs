import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';

@Module({
    imports: [TypeOrmModule.forFeature([BooksRepository])],
    controllers: [BooksController],
    providers: [],
})
export class BooksModule {}
