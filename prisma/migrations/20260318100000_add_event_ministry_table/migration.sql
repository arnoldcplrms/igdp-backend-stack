-- CreateTable
CREATE TABLE "public"."EventMinistry" (
    "eventId" INTEGER NOT NULL,
    "ministryId" INTEGER NOT NULL,
    "isPrimaryOrganizer" BOOLEAN,

    CONSTRAINT "EventMinistry_pkey" PRIMARY KEY ("eventId","ministryId")
);

-- CreateIndex
CREATE INDEX "EventMinistry_ministryId_idx" ON "public"."EventMinistry"("ministryId");

-- AddForeignKey
ALTER TABLE "public"."EventMinistry" ADD CONSTRAINT "EventMinistry_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EventMinistry" ADD CONSTRAINT "EventMinistry_ministryId_fkey" FOREIGN KEY ("ministryId") REFERENCES "public"."Ministry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
