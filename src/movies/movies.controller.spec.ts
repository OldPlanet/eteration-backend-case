import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movies.interface';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      const saveSpy = jest.spyOn(service, 'save').mockResolvedValue(mockMovie);

      const result = await controller.save(mockMovie);

      expect(saveSpy).toHaveBeenCalledWith(mockMovie);
      expect(result).toEqual(mockMovie);
    });
  });
});
