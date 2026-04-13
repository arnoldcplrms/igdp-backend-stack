/*
  Warnings:

  - A unique constraint covering the columns `[name,address]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,address]` on the table `School` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."School_name_key";

-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "employedCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "formerEmployeeCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_address_key" ON "public"."Company"("name", "address");

-- CreateIndex
CREATE UNIQUE INDEX "School_name_address_key" ON "public"."School"("name", "address");
