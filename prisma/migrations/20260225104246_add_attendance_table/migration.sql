-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
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

-- CreateTable
CREATE TABLE "public"."Attendance" (
    "eventId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMPTZ(6),
    "deletedBy" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("eventId","accountId")
);

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_deletedBy_fkey" FOREIGN KEY ("deletedBy") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
