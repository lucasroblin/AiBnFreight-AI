/*
  Warnings:

  - You are about to drop the column `availableWeight` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `available_weight` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "availableWeight",
ADD COLUMN     "available_weight" INTEGER NOT NULL;
