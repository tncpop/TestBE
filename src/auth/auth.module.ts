import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: 'mysecretkey', // ✅ ควรเก็บใน .env
      signOptions: { expiresIn: '1h' }, // token มีอายุ 1 ชม.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
