import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidV4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';
import { DbType, db } from 'src/types';

@Injectable()
export class ArtistService {
  private db: DbType = db;

  create(dto: CreateArtistDto) {
    const id = uuidV4();
    const newArtist: ArtistEntity = {
      id,
      name: dto.name,
      grammy: dto.grammy,
    };

    this.db.artists[id] = { ...newArtist };
    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto) {
    if (this.db.artists[id] === undefined) {
      throw new NotFoundException("record with this ID doesn't exist");
    }

    const newArtist: ArtistEntity = {
      ...this.db.artists[id],
      name: dto.name,
      grammy: dto.grammy,
    };
    this.db.artists[id] = newArtist;
    return newArtist;
  }

  findAll() {
    return Object.values(this.db.artists);
  }

  findOne(id: string) {
    if (this.db.artists[id] === undefined) {
      throw new NotFoundException('artist not found');
    }
    return this.db.artists[id];
  }

  remove(id: string) {
    if (this.db.artists[id] === undefined) {
      throw new NotFoundException('artist not found');
    }
    delete this.db.artists[id];
    for (let i = 0; i < this.db.favorites.artists.length; i++) {
      if (this.db.favorites.artists[i].id === id) {
        this.db.favorites.artists.splice(i, 1);
        return;
      }
    }

    for (const key in this.db.tracks) {
      if (this.db.tracks[key]['artistId'] === id) {
        this.db.tracks[key]['artistId'] = null;
        return;
      }
    }
    for (const key in this.db.albums) {
      if (this.db.albums[key]['artistId'] === id) {
        this.db.albums[key]['artistId'] = null;
        return;
      }
    }
  }
}
