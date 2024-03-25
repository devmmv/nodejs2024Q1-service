import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    return await this.prisma.user.create({
      data: { ...dto },
    });
  }

  async updatePassword(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException("record with this ID doesn't exist");
    } else {
      if (user.password === dto.oldPassword) {
        return await this.prisma.user.update({
          where: { id },
          data: { password: dto.newPassword, version: { increment: 1 } },
        });
      } else {
        throw new ForbiddenException('old password is wrong');
      }
    }
  }
  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user: any = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user not found');

    return this.prisma.user.delete({ where: { id } });
  }
}
