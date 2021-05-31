import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
    constructor(
        @InjectRepository(Book)
        private readonly booksRepository: Repository<Book>,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        const book: Book = await createBookDto.toModel();
        await this.booksRepository.save(book);
        return book;
    }
}
