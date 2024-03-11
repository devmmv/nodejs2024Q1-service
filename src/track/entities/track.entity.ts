import { IsUUID } from 'class-validator';

export class TrackEntity {
  @IsUUID(4)
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
