/*
  Warnings:

  - You are about to drop the column `dGroupLeaderId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_dGroupLeaderId_fkey";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "dGroupLeaderId";
