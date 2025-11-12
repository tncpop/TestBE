import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { SaleItem } from './sale-item.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: ['cash', 'qr'] })
  payment_method: 'cash' | 'qr';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cash_received: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  change: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];
}
