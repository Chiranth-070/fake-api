-- CreateTable
CREATE TABLE "MockApi" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockApi_pkey" PRIMARY KEY ("id")
);
