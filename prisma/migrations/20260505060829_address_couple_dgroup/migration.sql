/*
  Warnings:

  - You are about to drop the column `spouseId` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `dGroupId` on the `DGroupMembership` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `DGroupMembership` table. All the data in the column will be lost.
  - Added the required column `type` to the `DGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dgroupId` to the `DGroupMembership` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."DGroupType" AS ENUM ('Singles', 'Couples');

-- DropForeignKey
ALTER TABLE "public"."Account" DROP CONSTRAINT "Account_spouseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DGroupMembership" DROP CONSTRAINT "DGroupMembership_accountId_fkey";

-- DropForeignKey
ALTER TABLE "public"."DGroupMembership" DROP CONSTRAINT "DGroupMembership_dGroupId_fkey";

-- DropIndex
DROP INDEX "public"."Account_spouseId_key";

-- DropIndex
DROP INDEX "public"."DGroupMembership_dGroupId_accountId_key";

-- AlterTable
ALTER TABLE "public"."Account" DROP COLUMN "spouseId",
ADD COLUMN     "coupleId" INTEGER;

-- AlterTable
ALTER TABLE "public"."DGroup" ADD COLUMN     "type" "public"."DGroupType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."DGroupMembership" DROP COLUMN "dGroupId",
DROP COLUMN "updatedAt",
ADD COLUMN     "coupleId" INTEGER,
ADD COLUMN     "dgroupId" INTEGER NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'Member',
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Couple" (
    "id" SERIAL NOT NULL,
    "husbandId" INTEGER NOT NULL,
    "wifeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "Couple_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Couple_husbandId_key" ON "public"."Couple"("husbandId");

-- CreateIndex
CREATE UNIQUE INDEX "Couple_wifeId_key" ON "public"."Couple"("wifeId");

-- CreateIndex
CREATE INDEX "DGroupMembership_dgroupId_idx" ON "public"."DGroupMembership"("dgroupId");

-- AddForeignKey
ALTER TABLE "public"."DGroupMembership" ADD CONSTRAINT "DGroupMembership_dgroupId_fkey" FOREIGN KEY ("dgroupId") REFERENCES "public"."DGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DGroupMembership" ADD CONSTRAINT "DGroupMembership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DGroupMembership" ADD CONSTRAINT "DGroupMembership_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "public"."Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_coupleId_fkey" FOREIGN KEY ("coupleId") REFERENCES "public"."Couple"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Couple" ADD CONSTRAINT "Couple_husbandId_fkey" FOREIGN KEY ("husbandId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Couple" ADD CONSTRAINT "Couple_wifeId_fkey" FOREIGN KEY ("wifeId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
