import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtitModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, ArtitModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
