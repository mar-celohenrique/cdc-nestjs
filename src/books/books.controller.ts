import { BaseQueryParametersDto, QueryResultDTO } from '@/commons/dto';
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
    constructor(
        @InjectRepository(BooksRepository)
        private readonly booksRepository: BooksRepository,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        const book: Book = await createBookDto.toModel();
        await this.booksRepository.save(book);
        return book;
    }

    @Get()
    async getAllBooks(@Query() params: BaseQueryParametersDto): Promise<QueryResultDTO<Book>> {
        return await this.booksRepository.findAll(params);
    }
}
