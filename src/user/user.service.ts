import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, password: string, role: UserRole = UserRole.USER): Promise<User | null> {
    const exist = await this.usersRepository.findOne({ where: { username } });
    if (exist) return null;

    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, password: hashed, role });
    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async update(
    id: number,
    username: string,
    password?: string,
    role?: UserRole,
  ): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) return null;

    user.username = username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (role) {
      user.role = role;
    }

    return this.usersRepository.save(user);
  }
}
