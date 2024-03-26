import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: {
        name: dto.name,
        artistId: dto.artistId,
        year: dto.year,
      },
    });

    return newAlbum;
  }

  async update(id: string, dto: CreateAlbumDto) {
    const findAlbum = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!findAlbum) {
      throw new NotFoundException("record with this ID doesn't exist");
    }
    return await this.prisma.album.update({
      where: { id },
      data: { name: dto.name, artistId: dto.artistId, year: dto.year },
    });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return album;
  }

  async remove(id: string) {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException('album not found');
    }
    return await this.prisma.album.delete({ where: { id } });
  }
}
