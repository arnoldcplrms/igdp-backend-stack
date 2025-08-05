/*
  Warnings:

  - You are about to drop the column `schoolId` on the `Account` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_schoolId_fkey";

-- DropIndex
DROP INDEX "public"."Account_schoolId_idx";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "schoolId",
ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "accountId" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- CreateIndex
CREATE INDEX "idx_school_account_id" ON "public"."School"("accountId");

-- AddForeignKey
ALTER TABLE "public"."School" ADD CONSTRAINT "School_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
