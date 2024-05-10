import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TmdbModule } from './tmdb/tmdb.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [PrismaModule, TmdbModule, MoviesModule],
})

export class AppModule { }