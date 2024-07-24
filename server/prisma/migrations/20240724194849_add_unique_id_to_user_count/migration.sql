/*
  Warnings:

  - A unique constraint covering the columns `[filmStockId,userId]` on the table `UserCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserCount_filmStockId_userId_key" ON "UserCount"("filmStockId", "userId");
