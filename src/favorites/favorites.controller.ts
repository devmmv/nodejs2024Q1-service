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
  async addToFavs(
    @Param('fav') fav: 'artist' | 'album' | 'track',
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    const IsNonExistingEntity = await this.favoritesService.addToFavs(fav, id);
    if (IsNonExistingEntity === true) throw new UnprocessableEntityException();
  }
  @Delete(':fav/:id')
  @HttpCode(204)
  async deleteFromFavs(
    @Param('fav') fav: 'artist' | 'album' | 'track',
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
      }),
    )
    id: string,
  ) {
    return await this.favoritesService.deleteFromFavs(fav, id);
  }

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }
}
