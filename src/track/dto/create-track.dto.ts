import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsInt()
  duration: number;
  @ValidateIf(
    (o, value) =>
      value === String || (null && value !== undefined && value !== ''),
  )
  albumId: string;
  @ValidateIf(
    (o, value) =>
      value === String || (null && value !== undefined && value !== ''),
  )
  artistId: string;
}
