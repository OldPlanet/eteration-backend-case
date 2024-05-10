import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Movie } from './movies.interface';
import { MoviesService } from './movies.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Post()
    @ApiOperation({ summary: "Create a new movie entity." })
    async save(@Body() movie: Movie): Promise<Movie> {
        return this.moviesService.save(movie);
    }

    @Get(':id')
    @ApiOperation({ summary: "Get a movie entity with the id." })
    async findById(@Param('id') id: string): Promise<Movie | null> {
        return this.moviesService.findById(id);
    }

    @Get()
    @ApiOperation({ summary: "Get all the movie entities." })
    async findAll(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Delete(':id')
    @ApiOperation({ summary: "Delete a movie entity with the id." })
    async removeById(@Param('id') id: string): Promise<Movie | null> {
        return this.moviesService.removeById(id);
    }
}
