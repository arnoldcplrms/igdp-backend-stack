/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_deletedBy_fkey";

-- AlterTable
ALTER TABLE "public"."Attendance" DROP COLUMN "deletedAt",
DROP COLUMN "deletedBy",
DROP COLUMN "isDeleted";
