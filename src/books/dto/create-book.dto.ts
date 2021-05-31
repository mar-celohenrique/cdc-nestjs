import { Author } from '@/authors/entities/author.entity';
import { Category } from '@/categories/entities/category.entity';
import { ExistsValue, UniqueValue } from '@/commons/validations/validations';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, MaxLength, Min, MinDate } from 'class-validator';
import { getConnection } from 'typeorm';
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
    @ExistsValue({ field: 'id', clazz: Category })
    categoryId: number;

    @IsNotEmpty()
    @ExistsValue({ field: 'id', clazz: Author })
    authorId: number;

    async toModel(): Promise<Book> {
        const category: Category = await getConnection()
            .createQueryBuilder()
            .select('category')
            .from(Category, 'category')
            .where('category.id = :id', { id: this.categoryId })
            .getOneOrFail();

        const author: Author = await getConnection()
            .createQueryBuilder()
            .select('author')
            .from(Author, 'author')
            .where('author.id = :id', { id: this.authorId })
            .getOneOrFail();

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
