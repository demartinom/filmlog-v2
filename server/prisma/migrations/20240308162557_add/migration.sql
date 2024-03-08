/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `FilmStock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ISO` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `makerId` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FilmStock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `FilmStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilmStock" ADD COLUMN     "ISO" INTEGER NOT NULL,
ADD COLUMN     "format" TEXT[],
ADD COLUMN     "makerId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Maker" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Maker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roll" (
    "id" SERIAL NOT NULL,
    "dateStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateFinished" TIMESTAMP(3),
    "filmId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Roll_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Maker_id_key" ON "Maker"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Maker_name_key" ON "Maker"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Roll_id_key" ON "Roll"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmStock_id_key" ON "FilmStock"("id");

-- AddForeignKey
ALTER TABLE "FilmStock" ADD CONSTRAINT "FilmStock_makerId_fkey" FOREIGN KEY ("makerId") REFERENCES "Maker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roll" ADD CONSTRAINT "Roll_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "FilmStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Roll" ADD CONSTRAINT "Roll_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
