-- AlterTable
ALTER TABLE "public"."School" ALTER COLUMN "createdAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "updatedAt" SET DEFAULT timezone('Asia/Manila'::text, now()),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(6);
