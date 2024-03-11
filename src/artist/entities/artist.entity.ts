import { IsUUID } from 'class-validator';

export class ArtistEntity {
  @IsUUID(4)
  id: string;
  name: string;
  grammy: boolean;
  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
