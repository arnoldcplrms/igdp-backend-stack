-- CreateTable
CREATE TABLE "public"."AccountMinistry" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "ministryId" INTEGER NOT NULL,
    "ministryRoleId" INTEGER NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT (now() AT TIME ZONE 'Asia/Manila'),

    CONSTRAINT "AccountMinistry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "unique_account_ministry" ON "public"."AccountMinistry"("accountId", "ministryId");

-- CreateIndex
CREATE UNIQUE INDEX "AccountMinistry_accountId_primary_true_key" ON "public"."AccountMinistry"("accountId") WHERE "isPrimary" = true;

-- CreateIndex
CREATE UNIQUE INDEX "unique_ministry_role_ministry" ON "public"."MinistryRole"("id", "ministryId");

-- AddForeignKey
ALTER TABLE "public"."AccountMinistry"
ADD CONSTRAINT "AccountMinistry_accountId_fkey"
FOREIGN KEY ("accountId") REFERENCES "public"."Account"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccountMinistry"
ADD CONSTRAINT "AccountMinistry_ministryId_fkey"
FOREIGN KEY ("ministryId") REFERENCES "public"."Ministry"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AccountMinistry"
ADD CONSTRAINT "AccountMinistry_ministryRoleId_ministryId_fkey"
FOREIGN KEY ("ministryRoleId", "ministryId") REFERENCES "public"."MinistryRole"("id", "ministryId")
ON DELETE RESTRICT ON UPDATE CASCADE;