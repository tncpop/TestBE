import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ExampleService } from './example.service';

@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Get()
  getAll() {
    return this.exampleService.findAll();
  }

  @Post()
  create(@Body('message') message: string) {
    return this.exampleService.create(message);
  }

  // PATCH /example/:id → อัปเดตข้อความ
  @Patch(':id')
  update(@Param('id') id: number, @Body('message') message: string) {
    return this.exampleService.update(id, message);
  }

  // DELETE /example/:id → ลบข้อมูล
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.exampleService.remove(id);
  }
}
