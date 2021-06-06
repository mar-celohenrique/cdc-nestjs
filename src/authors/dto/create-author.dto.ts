import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';
import { UniqueValue } from '@/commons/validations/validations';
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
}
