import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DbType, db } from 'src/types';

@Injectable()
export class AlbumService {
  private db: DbType = db;

  create(dto: CreateAlbumDto) {
    const id = uuidV4();
    const newAlbum: AlbumEntity = {
      id,
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    };

    this.db.albums[id] = { ...newAlbum };
    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto) {
    if (this.db.albums[id] === undefined) {
      throw new NotFoundException("record with this ID doesn't exist");
    }

    const newAlbum: AlbumEntity = {
      ...this.db.albums[id],
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    };
    this.db.albums[id] = newAlbum;
    return newAlbum;
  }

  findAll() {
    return Object.values(this.db.albums);
  }

  findOne(id: string) {
    if (!this.db.albums[id]) {
      throw new NotFoundException('album not found');
    }
    return this.db.albums[id];
  }

  remove(id: string) {
    if (this.db.albums[id] === undefined) {
      throw new NotFoundException('album not found');
    }
    delete this.db.albums[id];
    for (let i = 0; i < this.db.favorites.albums.length; i++) {
      if (this.db.favorites.albums[i].id === id) {
        this.db.favorites.albums.splice(i, 1);
        return;
      }
    }
    for (const key in this.db.tracks) {
      if (this.db.tracks[key]['albumId'] === id) {
        this.db.tracks[key]['albumId'] = null;
        return;
      }
    }
  }
}
