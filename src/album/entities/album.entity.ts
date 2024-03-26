import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class AlbumEntity {
  @IsUUID('4')
  id: string;
  name: string;
  artistId: string | null;
  year: number;

  @Exclude()
  favoritesId: string;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
