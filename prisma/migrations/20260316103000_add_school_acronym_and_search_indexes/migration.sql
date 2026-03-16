-- AlterTable
ALTER TABLE "public"."School"
ADD COLUMN "acronym" VARCHAR(20);

-- Enable trigram index support for faster case-insensitive contains searches.
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_school_name_trgm"
ON "public"."School"
USING gin (LOWER("name") gin_trgm_ops);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "idx_school_acronym_trgm"
ON "public"."School"
USING gin (LOWER("acronym") gin_trgm_ops);