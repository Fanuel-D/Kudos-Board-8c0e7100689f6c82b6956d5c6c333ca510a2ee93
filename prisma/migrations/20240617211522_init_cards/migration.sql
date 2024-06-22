-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);
