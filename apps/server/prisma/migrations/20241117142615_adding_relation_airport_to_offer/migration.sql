/*
  Warnings:

  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `arrival` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `departure` on the `Offer` table. All the data in the column will be lost.
  - Added the required column `arrivalId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("iata");

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "arrival",
DROP COLUMN "departure",
ADD COLUMN     "arrivalId" TEXT NOT NULL,
ADD COLUMN     "departureId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Airport"("iata") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_arrivalId_fkey" FOREIGN KEY ("arrivalId") REFERENCES "Airport"("iata") ON DELETE RESTRICT ON UPDATE CASCADE;
