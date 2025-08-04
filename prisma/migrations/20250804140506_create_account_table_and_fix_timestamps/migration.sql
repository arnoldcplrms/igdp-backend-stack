-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('Admin', 'MinistryHead', 'DGM', 'Member');

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- AlterTable
ALTER TABLE "public"."School" ALTER COLUMN "createdAt" SET DEFAULT (now() AT TIME ZONE 'Asia/Manila');

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "middleName" VARCHAR(50),
    "lastName" VARCHAR(50) NOT NULL,
    "facebookLink" VARCHAR(255),
    "contactNumber" VARCHAR(20) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "gender" "public"."Gender" NOT NULL,
    "birthDate" DATE NOT NULL,
    "userType" "public"."UserType" NOT NULL,
    "schoolId" INTEGER,
    "dGroupLeaderId" INTEGER,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_schoolId_idx" ON "public"."Account"("schoolId");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "public"."School"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_dGroupLeaderId_fkey" FOREIGN KEY ("dGroupLeaderId") REFERENCES "public"."Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
