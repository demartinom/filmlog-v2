/*
  Warnings:

  - A unique constraint covering the columns `[filmStockId,format]` on the table `RollCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RollCount_filmStockId_format_key" ON "RollCount"("filmStockId", "format");
