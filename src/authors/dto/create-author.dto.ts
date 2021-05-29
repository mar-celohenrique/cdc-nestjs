import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { UniqueValue } from 'src/commons/validations/validations';
import { Author } from '../entities/author.entity';

export class CreateAuthorDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    @UniqueValue({ field: 'email', clazz: Author })
    email: string;
    @IsNotEmpty()
    @MaxLength(400)
    description: string;

    toModel(): Author {
        return new Author(this.name, this.email, this.description);
    }
}
