import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private readonly apiKey: string;
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private prisma: PrismaService) {
    this.apiKey = '43a7c3e71f91aaf2d91a840d64137778'; // process.env.TMDB_API_KEY;
  }

  async fetchMovies(): Promise<any> {
    const url = `${this.baseUrl}/discover/movie`;
    const params = {
      api_key: this.apiKey,
      sort_by: 'release_date.asc',
      vote_count_gte: 1500,
      vote_average_gte: 8.4,
      with_watch_providers: '8',
      watch_region: 'TR',
    };

    try {
      const response = await axios.get(url, { params });
      return response.data.results.slice(0, 5);
    } catch (error) {
      throw new Error(`Error fetching movies from TMDB: ${error.message}`);
    }
  }

  async fetchAndSaveMovieDetails(): Promise<void> {
    const movies = await this.fetchMovies();

    for (const movie of movies) {
      try {
        const url = `${this.baseUrl}/movie/${movie.id}`;
        const params = {
          api_key: this.apiKey,
        };

        const response = await axios.get(url, { params });
        const movieDetails = response.data;

        await this.prisma.movies.create({
          data: {
            id: String(movieDetails.id),
            name: movieDetails.title,
            overview: movieDetails.overview,
            popularity: movieDetails.popularity,
            voteAverage: movieDetails.vote_average,
            voteCount: movieDetails.vote_count,
            releaseDate: movieDetails.release_date,
            genre: movieDetails.genres.map((genre) => ({
              id: genre.id,
              name: genre.name,
            })),
          },
        });
      } catch (error) {
        console.error(
          `Error fetching movie details from TMDB: ${error.message}`,
        );
      }
    }
  }
}
