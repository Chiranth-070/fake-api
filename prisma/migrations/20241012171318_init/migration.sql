/*
  Warnings:

  - A unique constraint covering the columns `[endpoint]` on the table `MockApi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MockApi_endpoint_key" ON "MockApi"("endpoint");
