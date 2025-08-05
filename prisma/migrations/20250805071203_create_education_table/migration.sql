/*
  Warnings:

  - You are about to drop the column `accountId` on the `School` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."GradeYear" AS ENUM ('PreSchool', 'Kindergarten', 'Grade1', 'Grade2', 'Grade3', 'Grade4', 'Grade5', 'Grade6', 'Grade7', 'Grade8', 'Grade9', 'Grade10', 'Grade11', 'Grade12', 'FirstYearCollege', 'SecondYearCollege', 'ThirdYearCollege', 'FourthYearCollege', 'FifthYearCollege', 'UnderGraduate', 'Graduated');

-- DropForeignKey
ALTER TABLE "public"."School" DROP CONSTRAINT "School_accountId_fkey";

-- DropIndex
DROP INDEX "public"."idx_school_account_id";

-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" DROP COLUMN "accountId",
ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- CreateTable
CREATE TABLE "public"."Education" (
    "id" SERIAL NOT NULL,
    "schoolId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "gradeYear" "public"."GradeYear" NOT NULL,
    "course" VARCHAR(150),
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
