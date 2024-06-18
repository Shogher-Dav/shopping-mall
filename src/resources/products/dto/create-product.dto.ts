import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { Category } from 'src/resources/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Name must have atleast 3 characters.' })
  @IsNotEmpty()
  title: string;

  @IsString()
  @MinLength(3, { message: 'Description must have atleast 3 characters.' })
  description: string;

  @IsString()
  @Length(8)
  sku: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  category: Category
}
