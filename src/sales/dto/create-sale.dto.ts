import { IsString, IsNumber, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

class SaleItemDto {
  @IsNumber()
  product_id: number;

  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @IsString()
  type: string;
}

export class CreateSaleDto {
  @IsString()
  username: string;

  @IsNumber()
  total_price: number;

  @IsEnum(['cash', 'qr'])
  payment_method: 'cash' | 'qr';

  @IsOptional()
  @IsNumber()
  cash_received?: number;

  @IsOptional()
  @IsNumber()
  change?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDto)
  items: SaleItemDto[];
}
