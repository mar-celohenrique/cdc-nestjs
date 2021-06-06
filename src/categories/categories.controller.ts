import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category: Category = this.categoryRepository.create(createCategoryDto);
        await this.categoryRepository.save(category);
        return category;
    }
}
