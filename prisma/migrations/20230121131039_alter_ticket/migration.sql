/*
  Warnings:

  - Added the required column `reaming_quantity` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_quantity` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "reaming_quantity" INTEGER NOT NULL,
ADD COLUMN     "total_quantity" INTEGER NOT NULL;
