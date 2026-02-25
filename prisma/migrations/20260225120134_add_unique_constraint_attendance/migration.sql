/*
  Warnings:

  - A unique constraint covering the columns `[eventId,accountId]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Attendance" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Education" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Employment" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Series" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_eventId_accountId_key" ON "public"."Attendance"("eventId", "accountId");
