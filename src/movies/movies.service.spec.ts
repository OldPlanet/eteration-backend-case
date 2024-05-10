import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MoviesService } from './movies.service';
import { Movie } from './movies.interface';

describe('MoviesService', () => {
  let service: MoviesService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        PrismaService,
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save movie to database', async () => {
      const mockMovie: Movie = {
        id: '1',
        name: 'Movie 1',
        overview: 'Overview 1',
        popularity: 7.8,
        voteAverage: 8.0,
        voteCount: 1000,
        releaseDate: '2022-01-01',
        genre: [{ id: 1, name: 'Action' }],
      };
      const createSpy = jest.spyOn(prismaService.movies, 'create').mockResolvedValue(mockMovie);

      const result = await service.save(mockMovie);

      expect(createSpy).toHaveBeenCalledWith({ data: mockMovie });
      expect(result).toEqual(mockMovie);
    });
  });
});
