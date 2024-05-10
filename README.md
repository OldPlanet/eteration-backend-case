<p align="center">
  <a href="https://eteration.com/tr" target="_blank" rel="noopener noreferrer"><img src="https://eteration.com/api/image/storage/uploads/2019/11/14/5dcd5f9465c3beteration-logo.png" width="300" alt="Eteration Logo" /></a>
</p>

  <p align="center">Eteration Backend Case is an API that retrieves data from The Movie Database (TMDB). It allows users to perform CRUD operations on movies, such as creating, reading, updating, and deleting movie data.</p>
    <p align="center">

## Description

There are 5 movies data fetched from TMDB (The Movie Database). The movies are the oldest ones with average vote count of 1500, with average vote of 8.4, on Netflix platform, and in Turkey. There are 4 types of CRUD operations which are POST a movie, GET a movie with the id, GET all the movies, and DELETE a movie with id.

## Installation

```bash
$ npm install
```

## Running the app

**Docker** and **PostgreSQL** should be installed for database connection.

```bash
# database
$ npm run db:dev:restart

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Usage

Once the project is set up, you can use the API to perform various operations on movies. Here are some examples:

- **POST** a movie: Create a new movie by sending a POST request with movie data to the appropriate endpoint.
- **GET** a movie: Retrieve a specific movie by its ID using a GET request to the appropriate endpoint.
- **GET** all movies: Retrieve a list of all movies using a GET request to the appropriate endpoint.
- **DELETE** a movie: Delete a movie by its ID using a DELETE request to the appropriate endpoint.

## API Documentation

The API documentation can be accessed using the `/api` URL from the project. Additionally, an OpenAPI Specification (formerly Swagger Specification) file named `openapi.json` is included in the project for reference.
