/*
  Warnings:

  - You are about to drop the column `gradeYear` on the `Education` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spouseId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedAt` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `DGroup` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `educationLevel` to the `Education` table without a default value. This is not possible if the table is not empty.
  - Made the column `position` on table `Employment` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `EventSpeakers` table without a default value. This is not possible if the table is not empty.
  - Made the column `updatedAt` on table `School` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."EducationLevel" AS ENUM ('JuniorHigh', 'SeniorHigh', 'College', 'Masteral', 'Doctoral');

-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "contactNumber" DROP NOT NULL,
ALTER COLUMN "userType" SET DEFAULT 'Member',
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."AccountMinistry" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Attendance" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."DGroup" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."DGroupMembership" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Education" DROP COLUMN "gradeYear",
ADD COLUMN     "educationLevel" "public"."EducationLevel" NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Employment" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."EventSpeakers" ADD COLUMN     "updatedAt" TIMESTAMP(6) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."Ministry" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."School" ADD COLUMN     "alumniStudentCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "enrolledStudentCount" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Series" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Speaker" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropEnum
DROP TYPE "public"."GradeYear";

-- CreateIndex
CREATE UNIQUE INDEX "Account_spouseId_key" ON "public"."Account"("spouseId");
