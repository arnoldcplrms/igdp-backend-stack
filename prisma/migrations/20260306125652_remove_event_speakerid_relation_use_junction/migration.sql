/*
  Warnings:

  - You are about to drop the column `speakerId` on the `Event` table. All the data in the column will be lost.

*/
-- Data migration: preserve existing Event.speakerId mappings in EventSpeakers
INSERT INTO "public"."Speaker" ("name", "accountId", "createdAt", "updatedAt")
SELECT DISTINCT
  TRIM(CONCAT(a."firstName", ' ', COALESCE(a."middleName" || ' ', ''), a."lastName")) AS "name",
  e."speakerId" AS "accountId",
  (now() AT TIME ZONE 'Asia/Manila') AS "createdAt",
  (now() AT TIME ZONE 'Asia/Manila') AS "updatedAt"
FROM "public"."Event" e
JOIN "public"."Account" a ON a."id" = e."speakerId"
LEFT JOIN "public"."Speaker" s ON s."accountId" = e."speakerId"
WHERE e."speakerId" IS NOT NULL
  AND s."id" IS NULL;

INSERT INTO "public"."EventSpeakers" ("speakerId", "eventId", "createdAt")
SELECT
  s."id" AS "speakerId",
  e."id" AS "eventId",
  COALESCE(e."createdAt", (now() AT TIME ZONE 'Asia/Manila')) AS "createdAt"
FROM "public"."Event" e
JOIN LATERAL (
  SELECT sp."id"
  FROM "public"."Speaker" sp
  WHERE sp."accountId" = e."speakerId"
  ORDER BY sp."id" ASC
  LIMIT 1
) s ON true
WHERE e."speakerId" IS NOT NULL
ON CONFLICT ("speakerId", "eventId") DO NOTHING;

-- DropForeignKey
ALTER TABLE "public"."Event" DROP CONSTRAINT "Event_speakerId_fkey";

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
ALTER TABLE "public"."Event" DROP COLUMN "speakerId",
ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."EventSpeakers" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Series" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Speaker" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');
