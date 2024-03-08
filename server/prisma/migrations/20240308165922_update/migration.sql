/*
  Warnings:

  - You are about to drop the column `format` on the `FilmStock` table. All the data in the column will be lost.
  - Added the required column `process` to the `FilmStock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FilmStock" DROP COLUMN "format",
ADD COLUMN     "formats" TEXT[],
ADD COLUMN     "img" TEXT,
ADD COLUMN     "process" TEXT NOT NULL;
