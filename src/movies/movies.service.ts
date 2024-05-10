import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Movie } from './movies.interface';

@Injectable()
export class MoviesService {
    constructor(private readonly prismaService: PrismaService) { }

    async save(movie: Movie): Promise<Movie> {
        return await this.prismaService.movies.create({ data: movie });
    }

    async findById(id: string): Promise<Movie | null> {
        return await this.prismaService.movies.findUnique({ where: { id } });
    }

    async findAll(): Promise<Movie[]> {
        return await this.prismaService.movies.findMany();
    }

    async removeById(id: string): Promise<Movie | null> {
        return await this.prismaService.movies.delete({ where: { id } });
    }
}
