import { Author } from '@/authors/entities/author.entity';

export class AuthorDetails {
    name: string;
    description: string;

    constructor(author: Author) {
        this.name = author.name;
        this.description = author.description;
    }
}
