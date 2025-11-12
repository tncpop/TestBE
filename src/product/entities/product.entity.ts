// src/products/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export type ProductType = 'เครื่องดื่ม' | 'ขนมหวาน';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'enum', enum: ['เครื่องดื่ม', 'ขนมหวาน'] })
  type: ProductType;

  @Column()
  image: string; // URL ของรูปภาพ
}
