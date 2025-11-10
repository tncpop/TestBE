import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCats(): string {
    return 'cats';
  }
  getHello(): string {
    return 'Hello World!';
  }
}
