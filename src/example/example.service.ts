import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Example } from './example.entity';

@Injectable()
export class ExampleService {
  constructor(
    @InjectRepository(Example)
    private repo: Repository<Example>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  create(message: string) {
    return this.repo.save({ message });
  }

  async update(id: number, message: string) {
    const example = await this.repo.findOneBy({ id });
    if (!example) throw new NotFoundException('Data not found');
    example.message = message;
    return this.repo.save(example);
  }

  async remove(id: number) {
    const example = await this.repo.findOneBy({ id });
    if (!example) throw new NotFoundException('Data not found');
    return this.repo.remove(example);
  }
}
