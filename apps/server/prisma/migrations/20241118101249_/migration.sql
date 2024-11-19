/*
  Warnings:

  - You are about to drop the column `available_weight` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `available` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "available_weight",
ADD COLUMN     "available" INTEGER NOT NULL;
