import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { TrackEntity } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private db: TrackEntity[];
  dbPath = '../../DB/trackData.json';

  constructor() {
    fs.promises
      .readFile(path.join(__dirname, this.dbPath), 'utf-8')
      .then((data) => {
        this.db = JSON.parse(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  private saveDb() {
    fs.promises.writeFile(
      path.join(__dirname, this.dbPath),
      JSON.stringify(this.db),
    );
  }

  create(dto: CreateTrackDto) {
    const newTrack = {
      id: uuidV4(),
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };

    this.db.push(newTrack);
    this.saveDb();
    return newTrack;
  }

  update(id: string, dto: UpdateTrackDto) {
    const index = this.db.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException("record with this ID doesn't exist");
    }
    const newTrack: TrackEntity = {
      ...this.db[index],
      name: dto.name,
      artistId: dto.artistId,
      albumId: dto.albumId,
      duration: dto.duration,
    };
    this.db[index] = newTrack;
    this.saveDb();
    return newTrack;
  }

  findAll() {
    return this.db;
  }

  findOne(id: string) {
    const track = this.db.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException('track not found');
    }

    return track;
  }

  remove(id: string) {
    const index = this.db.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('track not found');
    this.db.splice(index, 1);
    this.saveDb();
  }
  removeArtist(id: string) {
    this.db = this.db.map((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
      return track;
    });
  }
}
