/*
  Warnings:

  - The values [PreSchool,Kindergarten,Grade1,Grade2,Grade3,Grade4,Grade5,Grade6,Grade7,Grade8,Grade9,Grade10,Grade11,Grade12,FirstYearCollege,SecondYearCollege,ThirdYearCollege,FourthYearCollege,FifthYearCollege,UnderGraduate,Graduated] on the enum `GradeYear` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."GradeYear_new" AS ENUM ('JuniorHigh', 'SeniorHigh', 'College', 'Masteral', 'Doctoral');
ALTER TABLE "public"."Education" ALTER COLUMN "gradeYear" TYPE "public"."GradeYear_new" USING ("gradeYear"::text::"public"."GradeYear_new");
ALTER TYPE "public"."GradeYear" RENAME TO "GradeYear_old";
ALTER TYPE "public"."GradeYear_new" RENAME TO "GradeYear";
DROP TYPE "public"."GradeYear_old";
COMMIT;

-- DropIndex
DROP INDEX "public"."EventMinistry_ministryId_idx";
