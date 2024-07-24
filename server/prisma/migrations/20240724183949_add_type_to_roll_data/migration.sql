/*
  Warnings:

  - Added the required column `type` to the `Roll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Roll" ADD COLUMN     "type" TEXT NOT NULL;
