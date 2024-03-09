import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import { AlbumEntity } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private db: AlbumEntity[];
  dbPath = '../../DB/albumData.json';

  constructor(private trackServise: TrackService) {
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

  create(dto: CreateAlbumDto) {
    const newAlbum: AlbumEntity = {
      id: uuidV4(),
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    };

    this.db.push(newAlbum);
    this.saveDb();
    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto) {
    const index = this.db.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException("record with this ID doesn't exist");
    }
    const newAlbum: AlbumEntity = {
      ...this.db[index],
      name: dto.name,
      artistId: dto.artistId,
      year: dto.year,
    };
    this.db[index] = newAlbum;
    this.saveDb();
    return newAlbum;
  }

  findAll() {
    return this.db;
  }

  findOne(id: string) {
    const album = this.db.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException('album not found');
    }

    return album;
  }

  remove(id: string) {
    const index = this.db.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException('album not found');
    this.db.splice(index, 1);
    this.trackServise.removeAlbum(id);
    this.saveDb();
  }

  removeArtist(id: string) {
    this.db = this.db.map((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
      return album;
    });
  }
}
