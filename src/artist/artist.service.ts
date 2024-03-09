import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { v4 as uuidV4 } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import * as fs from 'fs';
import * as path from 'path';
import { ArtistEntity } from './entities/artist.entity';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  private db: ArtistEntity[];
  dbPath = '../../DB/artistData.json';

  constructor(
    private albumService: AlbumService,
    private trackService: TrackService,
  ) {
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

  create(dto: CreateArtistDto) {
    const newArtist: ArtistEntity = {
      id: uuidV4(),
      name: dto.name,
      grammy: dto.grammy,
    };

    this.db.push(newArtist);
    this.saveDb();
    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto) {
    const index = this.db.findIndex((e) => e.id === id);
    if (index === -1) {
      throw new NotFoundException("record with this ID doesn't exist");
    }
    const newArtist = {
      ...this.db[index],
      name: dto.name,
      grammy: dto.grammy,
    };
    this.db[index] = newArtist;
    this.saveDb();
    return newArtist;
  }

  findAll() {
    return this.db;
  }

  findOne(id: string) {
    const artist = this.db.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException('artist not found');
    }

    return artist;
  }

  remove(id: string) {
    const index = this.db.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('artist not found');
    this.db.splice(index, 1);
    this.albumService.removeArtist(id);
    this.trackService.removeArtist(id);

    this.saveDb();
    return true;
  }
}
