-- CreateEnum
CREATE TYPE "public"."DGroupMembershipRole" AS ENUM ('Member', 'Leader');

-- CreateTable
CREATE TABLE "public"."DGroupMembership" (
    "id" SERIAL NOT NULL,
    "dGroupId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "role" "public"."DGroupMembershipRole" NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('Asia/Manila'::text, now()),
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('Asia/Manila'::text, now()),

    CONSTRAINT "DGroupMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DGroupMembership_dGroupId_accountId_key" ON "public"."DGroupMembership"("dGroupId", "accountId");

-- AddForeignKey
ALTER TABLE "public"."DGroupMembership" ADD CONSTRAINT "DGroupMembership_dGroupId_fkey" FOREIGN KEY ("dGroupId") REFERENCES "public"."DGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DGroupMembership" ADD CONSTRAINT "DGroupMembership_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
