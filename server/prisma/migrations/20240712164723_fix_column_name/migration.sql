/*
  Warnings:

  - You are about to drop the column `userid` on the `UserCount` table. All the data in the column will be lost.
  - Added the required column `userId` to the `UserCount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserCount" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL;
