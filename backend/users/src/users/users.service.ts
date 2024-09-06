import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create({ password, ...userWithoutPassword }: CreateUserDto) {
    const saltRounds = this.configService.get('BCRYPT_SALT_ROUNDS');
    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    return this.prisma.user.create({
      data: { ...userWithoutPassword, password: hashedPassword },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const result = await this.prisma.user.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException();
    }

    return result;
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({ data, where: { id } });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
