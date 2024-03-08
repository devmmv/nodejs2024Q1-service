import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtitModule } from './artist/artist.module';

@Module({
  imports: [UserModule, ArtitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
