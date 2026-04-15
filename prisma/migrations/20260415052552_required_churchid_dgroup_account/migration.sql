/*
  Warnings:

  - Made the column `churchId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `churchId` on table `DGroup` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_churchId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DGroup" DROP CONSTRAINT "DGroup_churchId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "churchId" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."DGroup" ALTER COLUMN "churchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DGroup" ADD CONSTRAINT "DGroup_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
