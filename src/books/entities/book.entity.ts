import { Author } from '@/authors/entities/author.entity';
import { Category } from '@/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'title', nullable: false })
    title: string;

    @Column({ name: 'synopsis', nullable: false, length: 500 })
    synopsis: string;

    @Column({ name: 'summary', nullable: true })
    summary: string;

    @Column({ name: 'price', nullable: false })
    price: number;

    @Column({ name: 'pages', nullable: false })
    pages: number;

    @Column({ name: 'isbn', nullable: false, unique: true })
    isbn: string;

    @Column({ name: 'publication_date', nullable: false })
    publicationDate: Date;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
    category: Category;

    @ManyToOne(() => Author, { nullable: false })
    @JoinColumn({ name: 'author_id', referencedColumnName: 'id' })
    author: Author;
}
