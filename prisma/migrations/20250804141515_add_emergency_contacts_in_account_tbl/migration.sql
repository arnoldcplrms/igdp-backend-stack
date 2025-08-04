-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "emergencyContactName" VARCHAR(100),
ADD COLUMN     "emergencyContactNumber" VARCHAR(20),
ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
ALTER COLUMN "updatedAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');
