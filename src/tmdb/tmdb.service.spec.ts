import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import axios, { AxiosResponse } from 'axios';
import { TmdbService } from './tmdb.service';

jest.mock('axios');

describe('TmdbService', () => {
  let service: TmdbService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmdbService,
        PrismaService,
      ],
    }).compile();

    service = module.get<TmdbService>(TmdbService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('fetchMovies', () => {
    it('should fetch movies from TMDB API', async () => {
      const mockResponse: AxiosResponse<any> = {
        data: {
          results: [
            { id: 1, title: 'Movie 1', overview: 'Overview 1', popularity: 7.8, vote_average: 8.0, vote_count: 1000, release_date: '2022-01-01', genres: [{ id: 1, name: 'Action' }] },
            { id: 2, title: 'Movie 2', overview: 'Overview 2', popularity: 8.5, vote_average: 8.5, vote_count: 2000, release_date: '2022-02-01', genres: [{ id: 2, name: 'Drama' }] },
            { id: 3, title: 'Movie 3', overview: 'Overview 3', popularity: 9.0, vote_average: 9.0, vote_count: 3000, release_date: '2022-03-01', genres: [{ id: 3, name: 'Comedy' }] },
          ]
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        }
      };
      axios.get = jest.fn().mockResolvedValue(mockResponse);

      const result = await service.fetchMovies();

      expect(axios.get).toHaveBeenCalledWith(expect.any(String), { params: expect.any(Object) });
      expect(result).toEqual(mockResponse.data.results.slice(0, 5));
    });

    it('should throw error if fetching movies fails', async () => {
      const errorMessage = 'Error fetching movies from TMDB';
      axios.get = jest.fn().mockRejectedValue(new Error(errorMessage));

      await expect(service.fetchMovies()).rejects.toThrow(errorMessage);
    });
  });
});
