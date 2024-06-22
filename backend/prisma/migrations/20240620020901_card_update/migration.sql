-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "voteCount" INTEGER,
ALTER COLUMN "author" DROP NOT NULL;
