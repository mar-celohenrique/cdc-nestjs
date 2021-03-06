import { BaseQueryParametersDto, QueryResultDTO } from '@/commons/dto';
import {
    Controller,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Get,
    Query,
    Param,
    ParseIntPipe,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { BookDetailsDto } from './dto/book-details.dto';
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
        const book: Book = await createBookDto.toModel(this.booksRepository);
        await this.booksRepository.save(book);
        return book;
    }

    @Get()
    async getAll(@Query() params: BaseQueryParametersDto): Promise<QueryResultDTO<Book>> {
        return await this.booksRepository.findAll(params);
    }

    @Get(':id')
    async bookDetails(@Param('id', ParseIntPipe) id: number): Promise<BookDetailsDto> {
        const book: Book = await this.booksRepository.findOne(id, { relations: ['author'] });

        if (!book) {
            throw new NotFoundException();
        }

        return new BookDetailsDto(book);
    }
}
