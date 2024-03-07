/*
  Warnings:

  - You are about to drop the `film` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "film";

-- CreateTable
CREATE TABLE "FilmStock" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "FilmStock_pkey" PRIMARY KEY ("id")
);
