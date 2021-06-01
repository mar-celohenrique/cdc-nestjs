import { GenericRepository } from '@/commons/repository';
import { EntityRepository } from 'typeorm';
import { Book } from './entities/book.entity';
@EntityRepository(Book)
export class BooksRepository extends GenericRepository<Book> {}
