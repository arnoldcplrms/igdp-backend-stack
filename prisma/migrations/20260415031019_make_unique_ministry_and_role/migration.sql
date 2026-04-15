/*
  Warnings:

  - A unique constraint covering the columns `[name,parentMinistry,churchId]` on the table `Ministry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ministryId,roleName]` on the table `MinistryRole` will be added. If there are existing duplicate values, this will fail.
  - Made the column `churchId` on table `Ministry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."AccountMinistry" DROP CONSTRAINT "AccountMinistry_ministryRoleId_ministryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ministry" DROP CONSTRAINT "Ministry_churchId_fkey";

-- DropIndex
DROP INDEX "public"."MinistryRole_id_ministryId_key";

-- AlterTable
ALTER TABLE "public"."Ministry" ALTER COLUMN "churchId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Ministry_name_parentMinistry_churchId_key" ON "public"."Ministry"("name", "parentMinistry", "churchId");

-- CreateIndex
CREATE UNIQUE INDEX "MinistryRole_ministryId_roleName_key" ON "public"."MinistryRole"("ministryId", "roleName");

-- AddForeignKey
ALTER TABLE "public"."Ministry" ADD CONSTRAINT "Ministry_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccountMinistry" ADD CONSTRAINT "AccountMinistry_ministryRoleId_fkey" FOREIGN KEY ("ministryRoleId") REFERENCES "public"."MinistryRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
