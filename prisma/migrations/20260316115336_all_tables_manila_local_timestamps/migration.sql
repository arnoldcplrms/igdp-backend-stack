-- AlterTable
ALTER TABLE "public"."Account" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."AccountMinistry" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Attendance" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Education" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Employment" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Event" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."EventSpeakers" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Ministry" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Series" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);

-- AlterTable
ALTER TABLE "public"."Speaker" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);
