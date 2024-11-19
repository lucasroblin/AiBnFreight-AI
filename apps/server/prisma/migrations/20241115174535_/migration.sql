/*
  Warnings:

  - You are about to drop the `Balance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Balance";

-- DropTable
DROP TABLE "Transaction";

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "etd" TEXT NOT NULL,
    "eta" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);
