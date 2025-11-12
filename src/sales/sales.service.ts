import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleItem } from './entities/sale-item.entity';
import { Sale } from './entities/sale.entity';


@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepo: Repository<Sale>,
    @InjectRepository(SaleItem)
    private itemRepo: Repository<SaleItem>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const sale = this.saleRepo.create({
      username: createSaleDto.username,
      total_price: createSaleDto.total_price,
      payment_method: createSaleDto.payment_method,
      cash_received: createSaleDto.cash_received,
      change: createSaleDto.change,
      items: createSaleDto.items.map(item => this.itemRepo.create(item)),
    });

    return this.saleRepo.save(sale);
  }

  async findAll() {
    return this.saleRepo.find({ relations: ['items'], order: { created_at: 'DESC' } });
  }

  async findOne(id: number) {
    return this.saleRepo.findOne({ where: { id }, relations: ['items'] });
  }
}
