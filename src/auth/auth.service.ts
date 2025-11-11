import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.validateUser(username, password);
    if (!user) return null;

    // ตัด password ออกจาก object ก่อนส่ง
    const { password: _, ...result } = user;
    return result;
  }

  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) return null;

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return {
      success: true,
      user,
      access_token: token,
    };
  }
}
