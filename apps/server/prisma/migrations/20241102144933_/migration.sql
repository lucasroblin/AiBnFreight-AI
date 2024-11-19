/*
  Warnings:

  - You are about to alter the column `balance` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Balance" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
