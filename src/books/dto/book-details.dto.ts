import { Book } from '../entities/book.entity';
import { AuthorDetailsDto } from './author-details.dto';

export class BookDetailsDto {
    title: string;
    isbn: string;
    pages: number;
    price: number;
    synopsis: string;
    summary: string;
    publicationDate: Date;
    author: AuthorDetailsDto;

    constructor(book: Book) {
        this.title = book.title;
        this.isbn = book.isbn;
        this.pages = book.pages;
        this.price = book.price;
        this.synopsis = book.synopsis;
        this.summary = book.summary;
        this.publicationDate = book.publicationDate;
        this.author = new AuthorDetailsDto(book.author);
    }
}
