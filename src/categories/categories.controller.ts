import { Controller, Post, Body } from '@nestjs/common';
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
    async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category: Category = createCategoryDto.toModel();
        await this.categoryRepository.save(category);
        return category;
    }
}
