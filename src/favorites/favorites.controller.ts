import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post(':fav/:id')
  addToFavs(
    @Param('fav') fav: 'artist' | 'album' | 'track',
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    const IsNonExistingEntity = this.favoritesService.addToFavs(fav, id);
    if (IsNonExistingEntity) throw new UnprocessableEntityException();
  }
  @Delete(':fav/:id')
  @HttpCode(204)
  deleteFromFavs(
    @Param('fav') fav: 'artist' | 'album' | 'track',
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return this.favoritesService.deleteFromFavs(fav, id);
  }

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }
}
