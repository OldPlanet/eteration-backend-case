import { NestFactory } from '@nestjs/core';
import { TmdbService } from './tmdb/tmdb.service';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs';

async function initialize() {
    const appDocument = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Eteration Backend Case API')
        .setDescription('There are 5 movies data fetched from TMDB (The Movie Database). The movies are the oldest ones with average vote count of 1500, with average vote of 8.4, on Netflix platform, and in Turkey. There are 4 types of CRUD operations which are POST a movie, GET a movie with the id, GET all the movies, and DELETE a movie with id.')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(appDocument, config);
    SwaggerModule.setup('api', appDocument, document);
    writeFile('./openapi.json', JSON.stringify(document, null, 2), (err) => {
        if (err) {
            console.error('Error writing OpenAPI spec file:', err);
            return;
        }
        console.log('OpenAPI spec file generated successfully');
    });

    const app = await NestFactory.createApplicationContext(AppModule);
    const tmdbService = app.get(TmdbService);

    try {
        await tmdbService.fetchAndSaveMovieDetails();
        console.log('Movie data fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching and saving movie data:', error);
    } finally {
        await app.close();
    }
}

initialize();
