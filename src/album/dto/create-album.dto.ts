import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsInt()
  @IsNotEmpty()
  year: number;
  @ValidateIf(
    (o, value) => value === null && value !== undefined && value !== '',
  )
  artistId: string;
}
