import { Author } from '@/authors/entities/author.entity';
import { Category } from '@/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false, length: 500 })
    synopsis: string;

    summary: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    pages: number;

    @Column({ nullable: false, unique: true })
    isbn: string;

    @Column({ nullable: false })
    publicationDate: Date;

    @ManyToOne(() => Category)
    category: Category;

    @ManyToOne(() => Author)
    author: Author;

    constructor(
        title: string,
        synopsis: string,
        summary: string,
        price: number,
        pages: number,
        isbn: string,
        publicationDate: Date,
        category: Category,
        author: Author,
    ) {
        this.title = title;
        this.synopsis = synopsis;
        this.summary = summary;
        this.price = price;
        this.pages = pages;
        this.isbn = isbn;
        this.publicationDate = publicationDate;
        this.category = category;
        this.author = author;
    }
}
