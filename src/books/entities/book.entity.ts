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

    @ManyToOne(() => Category, { nullable: false })
    category: Category;

    @ManyToOne(() => Author, { nullable: false })
    author: Author;
}
