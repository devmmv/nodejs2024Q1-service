import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTrackDto) {
    return this.prisma.track.create({
      data: {
        ...dto,
      },
    });
  }

  async update(id: string, dto: UpdateTrackDto) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException("record with this ID doesn't exist");
    }
    return await this.prisma.track.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return track;
  }

  async remove(id: string) {
    const track = await this.prisma.track.findUnique({ where: { id } });
    if (!track) {
      throw new NotFoundException('track not found');
    }
    return await this.prisma.track.delete({ where: { id } });
  }
}
