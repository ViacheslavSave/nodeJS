/*
  Warnings:

  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `NumberOfSIMCards` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "quantity" INTEGER NOT NULL,
DROP COLUMN "NumberOfSIMCards",
ADD COLUMN     "NumberOfSIMCards" INTEGER NOT NULL;
