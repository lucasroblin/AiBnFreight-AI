/*
  Warnings:

  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status",
ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;
