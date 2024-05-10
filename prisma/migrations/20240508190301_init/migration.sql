-- CreateTable
CREATE TABLE "Movies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "popularity" INTEGER NOT NULL,
    "voteAverage" INTEGER NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "releaseDate" TEXT NOT NULL,
    "genre" JSONB[],

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);
