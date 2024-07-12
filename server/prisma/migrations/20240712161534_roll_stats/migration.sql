-- CreateTable
CREATE TABLE "RollCount" (
    "id" SERIAL NOT NULL,
    "filmStockId" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "RollCount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCount" (
    "id" SERIAL NOT NULL,
    "userid" TEXT NOT NULL,
    "filmStockId" INTEGER NOT NULL,
    "count" INTEGER NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "UserCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RollCount_id_key" ON "RollCount"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCount_id_key" ON "UserCount"("id");

-- AddForeignKey
ALTER TABLE "RollCount" ADD CONSTRAINT "RollCount_filmStockId_fkey" FOREIGN KEY ("filmStockId") REFERENCES "FilmStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCount" ADD CONSTRAINT "UserCount_filmStockId_fkey" FOREIGN KEY ("filmStockId") REFERENCES "FilmStock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
