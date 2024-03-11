import { AlbumEntity } from './album/entities/album.entity';
import { ArtistEntity } from './artist/entities/artist.entity';
import { TrackEntity } from './track/entities/track.entity';
import { UserEntity } from './user/entities/user.entity';

export type AlbumType = {
  [id: string]: AlbumEntity;
};
export type ArtistType = {
  [id: string]: ArtistEntity;
};
export type TracksType = {
  [id: string]: TrackEntity;
};
export type FavoritesType = {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
};
export type UsersType = {
  [id: string]: UserEntity;
};

export type DbType = {
  users: UsersType;
  albums: AlbumType;
  artists: ArtistType;
  tracks: TracksType;
  favorites: FavoritesType;
};

export const db: DbType = {
  users: {},
  albums: {},
  artists: {},
  tracks: {},
  favorites: { albums: [], artists: [], tracks: [] },
};
