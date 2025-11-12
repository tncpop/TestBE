// src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsEnum, IsUrl } from 'class-validator';
import type { ProductType } from '../entities/product.entity';


export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(['เครื่องดื่ม', 'ขนมหวาน'])
  type: ProductType;

  @IsUrl()
  image: string;
}
