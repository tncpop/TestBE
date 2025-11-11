import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const user = await this.userService.create(body.username, body.password);
    if (!user) return { success: false, message: 'Username already exists' };
    return { success: true, user: { id: user.id, username: user.username } };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(body.username, body.password);
    if (!user) return { success: false, message: 'Invalid credentials' };
    return { success: true, user: { id: user.id, username: user.username } };
  }

  // 🔹 ดึง user ทั้งหมด
  @Get()
  async getAll() {
    const users = await this.userService.findAll();
    return users.map(u => ({ id: u.id, username: u.username }));
  }

  // 🔹 ลบ user
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleted = await this.userService.delete(Number(id));
    return { success: deleted };
  }

  // 🔹 แก้ไข user
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { username: string; password?: string },
  ) {
    const updated = await this.userService.update(Number(id), body.username, body.password);
    if (!updated) return { success: false, message: 'User not found' };
    return { success: true, user: { id: updated.id, username: updated.username } };
  }
}
