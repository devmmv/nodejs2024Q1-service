import { Injectable } from '@nestjs/common';
import { DbType, db } from 'src/types';

@Injectable()
export class FavoritesService {
  private db: DbType = db;

  findAll() {
    return this.db.favorites;
  }

  addToFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const artist = this.db.artists[id];
        if (artist === undefined) return true;
        this.db.favorites.artists.push({ ...artist });
        break;
      }
      case 'album': {
        const album = this.db.albums[id];
        if (album === undefined) return true;
        this.db.favorites.albums.push({ ...album });
        break;
      }
      case 'track': {
        const track = this.db.tracks[id];
        if (track === undefined) return true;
        this.db.favorites.tracks.push({ ...track });
        break;
      }
    }
  }

  deleteFromFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const idx = this.db.favorites.artists.indexOf(this.db.artists[id]);
        this.db.favorites.artists.splice(idx, 1);
        break;
      }
      case 'album': {
        const idx = this.db.favorites.albums.indexOf(this.db.albums[id]);
        this.db.favorites.albums.splice(idx, 1);
        break;
      }
      case 'track': {
        const idx = this.db.favorites.tracks.indexOf(this.db.tracks[id]);
        this.db.favorites.tracks.splice(idx, 1);
        break;
      }
    }
  }
}
