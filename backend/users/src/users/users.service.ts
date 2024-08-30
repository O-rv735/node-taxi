import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ password, ...rest }: CreateUserDto) {
    const SALT_ROUNDS = 10;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return this.prisma.user.create({ data: { ...rest, password: hash } });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
