import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const artists = await this.prisma.artist.findMany({
      where: { favoritesId: { not: null } },
      select: { id: true, name: true, grammy: true },
    });
    const albums = await this.prisma.album.findMany({
      where: { favoritesId: { not: null } },
      select: { id: true, name: true, year: true, artistId: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { favoritesId: { not: null } },
      select: {
        id: true,
        name: true,
        duration: true,
        albumId: true,
        artistId: true,
      },
    });

    return { artists, albums, tracks };
  }

  async addToFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const artist = await this.prisma.artist.findUnique({
          where: { id },
        });
        if (!artist) return true;
        if (!artist.favoritesId) {
          const fav = await this.prisma.favorites.create({
            data: { artists: {} },
          });
          await this.prisma.artist.update({
            where: { id },
            data: { favoritesId: fav.id },
          });
        }
        break;
      }
      case 'album': {
        const album = await this.prisma.album.findUnique({
          where: { id },
        });
        if (!album) return true;
        if (!album.favoritesId) {
          const fav = await this.prisma.favorites.create({
            data: { albums: {} },
          });
          await this.prisma.album.update({
            where: { id },
            data: { favoritesId: fav.id },
          });
        }
        break;
      }
      case 'track': {
        const track = await this.prisma.track.findUnique({
          where: { id },
        });
        if (!track) return true;
        if (!track.favoritesId) {
          const fav = await this.prisma.favorites.create({
            data: { tracks: {} },
          });
          await this.prisma.track.update({
            where: { id },
            data: { favoritesId: fav.id },
          });
        }
        break;
      }
    }
  }

  async deleteFromFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const artist = await this.prisma.artist.findUnique({ where: { id } });
        await this.prisma.favorites.delete({
          where: { id: artist.favoritesId },
        });
        break;
      }
      case 'album': {
        const album = await this.prisma.album.findUnique({ where: { id } });
        await this.prisma.favorites.delete({
          where: { id: album.favoritesId },
        });
        break;
      }
      case 'track': {
        const track = await this.prisma.track.findUnique({ where: { id } });
        await this.prisma.favorites.delete({
          where: { id: track.favoritesId },
        });
        break;
      }
    }
  }
}
