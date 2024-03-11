import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DbType, db } from 'src/types';

@Injectable()
export class TrackService {
  private db: DbType = db;

  create(dto: CreateTrackDto) {
    const id = uuidV4();
    const newTrack: TrackEntity = {
      id,
      name: dto.name,
      albumId: dto.albumId,
      artistId: dto.artistId,
      duration: dto.duration,
    };

    this.db.tracks[id] = { ...newTrack };
    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto) {
    if (this.db.tracks[id] === undefined) {
      throw new NotFoundException("record with this ID doesn't exist");
    }

    const newTrack: TrackEntity = {
      ...this.db.tracks[id],
      name: dto.name,
      albumId: dto.albumId,
      artistId: dto.artistId,
      duration: dto.duration,
    };
    this.db.tracks[id] = newTrack;
    return newTrack;
  }

  findAll() {
    return Object.values(this.db.tracks);
  }

  findOne(id: string) {
    if (this.db.tracks[id] === undefined) {
      throw new NotFoundException('track not found');
    }
    return this.db.tracks[id];
  }

  remove(id: string) {
    if (this.db.tracks[id] === undefined) {
      throw new NotFoundException('track not found');
    }
    delete this.db.tracks[id];
    for (let i = 0; i < this.db.favorites.tracks.length; i++) {
      if (this.db.favorites.tracks[i].id === id) {
        this.db.favorites.tracks.splice(i, 1);
        return;
      }
    }
  }
}
