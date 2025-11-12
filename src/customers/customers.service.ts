// src/customers/customers.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { createdAt: 'DESC' } });
  }

  findOne(id: number): Promise<Customer |null> {
    return this.customerRepository.findOne({ where: { id } });
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
  if (!createCustomerDto.name) {
    throw new Error('Name is required');
  }

  const customer = this.customerRepository.create({
    name: createCustomerDto.name,
    phone: createCustomerDto.phone || undefined,
    points: 0,
  });

  return this.customerRepository.save(customer);
}


  async remove(id: number): Promise<void> {
    await this.customerRepository.delete(id);
  }
}
