import { IsNotEmpty } from 'class-validator';
import { UniqueValue } from '@/commons/validations/validations';
import { Category } from '../entities/category.entity';
export class CreateCategoryDto {
    @IsNotEmpty()
    @UniqueValue({ field: 'name', clazz: Category })
    name: string;
}
