/*
  Warnings:

  - You are about to drop the column `gradeYear` on the `Education` table. All the data in the column will be lost.
  - Added the required column `educationLevel` to the `Education` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('JuniorHigh', 'SeniorHigh', 'College', 'Masteral', 'Doctoral');

-- DropIndex
DROP INDEX "public"."EventMinistry_ministryId_idx";

-- AlterTable
ALTER TABLE "public"."Education" DROP COLUMN "gradeYear",
ADD COLUMN     "educationLevel" "public"."EducationLevel" NOT NULL;

-- DropEnum
DROP TYPE "public"."GradeYear";
