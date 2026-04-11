-- DropIndex
DROP INDEX "public"."EventMinistry_ministryId_idx";

-- AlterTable
ALTER TABLE "public"."Account" ADD COLUMN     "churchId" INTEGER;

-- AlterTable
ALTER TABLE "public"."DGroup" ADD COLUMN     "churchId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Event" ADD COLUMN     "churchId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Ministry" ADD COLUMN     "churchId" INTEGER;

-- AlterTable
ALTER TABLE "public"."Series" ADD COLUMN     "churchId" INTEGER;

-- CreateTable
CREATE TABLE "public"."Church" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('Asia/Manila'::text, now()),
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('Asia/Manila'::text, now()),

    CONSTRAINT "Church_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Ministry" ADD CONSTRAINT "Ministry_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DGroup" ADD CONSTRAINT "DGroup_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Series" ADD CONSTRAINT "Series_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "public"."Church"("id") ON DELETE SET NULL ON UPDATE CASCADE;
