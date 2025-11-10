// src/example/example.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Example } from './example.entity';
import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Example])], // ✅ เพิ่มตรงนี้
  providers: [ExampleService],
  controllers: [ExampleController],
})
export class ExampleModule {}
