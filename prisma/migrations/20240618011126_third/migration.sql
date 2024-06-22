/*
  Warnings:

  - The primary key for the `board` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `board` table. All the data in the column will be lost.
  - The primary key for the `card` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `card` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "board" DROP CONSTRAINT "board_pkey",
DROP COLUMN "id",
ADD COLUMN     "boardId" SERIAL NOT NULL,
ADD CONSTRAINT "board_pkey" PRIMARY KEY ("boardId");

-- AlterTable
ALTER TABLE "card" DROP CONSTRAINT "card_pkey",
DROP COLUMN "id",
ADD COLUMN     "cardId" SERIAL NOT NULL,
ADD CONSTRAINT "card_pkey" PRIMARY KEY ("cardId");
