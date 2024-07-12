/*
  Warnings:

  - Added the required column `type` to the `RollCount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RollCount" ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCount" ADD COLUMN     "type" TEXT NOT NULL;
