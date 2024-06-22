/*
  Warnings:

  - You are about to drop the column `category` on the `card` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "card" DROP COLUMN "category",
DROP COLUMN "text";

-- CreateTable
CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "board_pkey" PRIMARY KEY ("id")
);
