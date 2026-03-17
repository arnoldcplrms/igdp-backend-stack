-- CreateTable
CREATE TABLE "public"."DGroup" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT timezone('Asia/Manila'::text, now()),
    "updatedAt" TIMESTAMP(6) DEFAULT timezone('Asia/Manila'::text, now()),

    CONSTRAINT "DGroup_pkey" PRIMARY KEY ("id")
);
