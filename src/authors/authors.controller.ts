import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from './entities/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async reate(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author: Author = createAuthorDto.toModel();
    await this.authorsRepository.save(author);
    return author;
  }
}
