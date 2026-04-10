/*
  Warnings:

  - Made the column `position` on table `Employment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Employment" ALTER COLUMN "position" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "alumniStudentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "enrolledStudentCount" INTEGER NOT NULL DEFAULT 0;
