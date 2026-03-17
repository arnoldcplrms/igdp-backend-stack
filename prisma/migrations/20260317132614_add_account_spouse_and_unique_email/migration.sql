/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "spouseId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "public"."Account"("email");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_spouseId_fkey" FOREIGN KEY ("spouseId") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
