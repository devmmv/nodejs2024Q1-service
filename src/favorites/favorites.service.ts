import { Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import * as fs from 'fs';
import * as path from 'path';
import { FavsEntity } from './entities/favorite.entity';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class FavoritesService {
  create() {
    return 'This action adds a new favorite';
  }
  private db: FavsEntity;
  dbPath = '../../DB/favoritesData.json';

  constructor(
    private artistServise: ArtistService,
    private albumServise: AlbumService,
    private trackServise: TrackService,
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
  findAll() {
    return this.db;
  }

  addToFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const artist = this.artistServise.db.find((artist) => artist.id === id);
        if (!artist) return true;
        if (!this.artistServise.isFavs(id)) {
          this.artistServise.addToFavs(id);
          this.db.artists.push(artist);
          this.saveDb();
        }
        break;
      }
      case 'album': {
        const album = this.albumServise.db.find((album) => album.id === id);
        if (!album) return true;
        if (!this.albumServise.isFavs(id)) {
          this.albumServise.addToFavs(id);
          this.db.albums.push(album);
          this.saveDb();
        }
        break;
      }
      case 'track': {
        const track = this.trackServise.db.find((track) => track.id === id);
        if (!track) return true;
        if (!this.trackServise.isFavs(id)) {
          this.trackServise.addToFavs(id);
          this.db.tracks.push(track);
          this.saveDb();
        }
        break;
      }
    }
  }
  deleteFromFavs(fav: 'artist' | 'album' | 'track', id: string) {
    switch (fav) {
      case 'artist': {
        const artist = this.artistServise.db.find((artist) => artist.id === id);
        if (!artist) return true;
        if (this.artistServise.isFavs(id)) {
          this.artistServise.deleteFromFavs(id);
          this.db.artists = this.db.artists.filter(
            (artist) => artist.id !== id,
          );
          this.saveDb();
        }
        break;
      }
      case 'album': {
        const album = this.albumServise.db.find((album) => album.id === id);
        if (!album) return true;
        if (this.albumServise.isFavs(id)) {
          this.albumServise.deleteFromFavs(id);
          this.db.albums = this.db.albums.filter((album) => album.id !== id);
          this.saveDb();
        }
        break;
      }
      case 'track': {
        const track = this.trackServise.db.find((track) => track.id === id);
        if (!track) return true;
        if (this.trackServise.isFavs(id)) {
          this.trackServise.deleteFromFavs(id);
          this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
          this.saveDb();
        }
        break;
      }
    }
  }

  // findAll() {
  //   const artists = this.artistService.getFavorites();
  //   const albums = this.albumService.getFavorites();
  //   const tracks = this.trackService.getFavorites();
  //   return { artists, albums, tracks };
  // }

  // add(favTable: string, id: string) {
  //   switch (favTable) {
  //     case 'track':
  //       if (this.trackService.findOne(id)) {
  //         this.trackService.addToFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     case 'artist':
  //       if (this.artistService.findOne(id)) {
  //         this.artistService.addToFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     case 'album':
  //       if (this.albumService.findOne(id)) {
  //         this.albumService.addToFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     default:
  //       return false;
  //   }
  // }

  // remove(favTable: string, id: string) {
  //   switch (favTable) {
  //     case 'track':
  //       if (this.trackService.hasFavorite(id)) {
  //         this.trackService.removeFromFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     case 'artist':
  //       if (this.artistService.hasFavorite(id)) {
  //         this.artistService.removeFromFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     case 'album':
  //       if (this.albumService.hasFavorite(id)) {
  //         this.albumService.removeFromFavorites(id);
  //         return true;
  //       }
  //       return false;
  //     default:
  //       return false;
  //   }
  // }
}
