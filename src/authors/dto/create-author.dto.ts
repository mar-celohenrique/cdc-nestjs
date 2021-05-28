import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Author } from "../entities/author.entity";

export class CreateAuthorDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Length(1, 400)
    description: string;

    toModel(): Author {
        return new Author(this.name, this.email, this.description);
    }
}
