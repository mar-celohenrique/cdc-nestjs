import { Author } from '@/authors/entities/author.entity';
import { Category } from '@/categories/entities/category.entity';
import { findById } from '@/commons/repository/query-repository';
import { ExistsValue, UniqueValue } from '@/commons/validations/validations';
import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty, MaxLength, Min, MinDate } from 'class-validator';
import { Book } from '../entities/book.entity';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @MaxLength(500)
    synopsis: string;

    summary: string;

    @IsNotEmpty()
    @Min(20)
    price: number;

    @IsNotEmpty()
    @Min(100)
    pages: number;

    @IsNotEmpty()
    @UniqueValue({ field: 'isbn', clazz: Book })
    isbn: string;

    @Type(() => Date)
    @IsNotEmpty()
    @IsDate()
    @MinDate(new Date())
    publicationDate: Date;

    @IsNotEmpty()
    @IsInt()
    @ExistsValue({ field: 'id', clazz: Category })
    categoryId: number;

    @IsNotEmpty()
    @IsInt()
    @ExistsValue({ field: 'id', clazz: Author })
    authorId: number;

    async toModel(): Promise<Book> {
        const category: Category = await findById(Category, this.categoryId);

        const author: Author = await findById(Author, this.authorId);

        return new Book(
            this.title,
            this.synopsis,
            this.summary,
            this.price,
            this.pages,
            this.isbn,
            this.publicationDate,
            category,
            author,
        );
    }
}
