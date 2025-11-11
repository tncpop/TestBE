import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { Example } from './example/example.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ExampleModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',       // Docker map port มา localhost
      port: 5432,
      username: 'testdocker',  // user ที่ตั้งใน Docker
      password: '1234',        // password ที่ตั้งใน Docker
      database: 'mydb',        // database name
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    // entity ของเรา
      synchronize: true,       // dev mode เท่านั้น
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
