-- Create or replace function that enforces Manila-local updatedAt.
CREATE OR REPLACE FUNCTION public.set_updated_at_manila_local()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
	NEW."updatedAt" := timezone('Asia/Manila'::text, now());
	RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_updated_at_manila_account ON "public"."Account";
CREATE TRIGGER set_updated_at_manila_account
BEFORE UPDATE ON "public"."Account"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_account_ministry ON "public"."AccountMinistry";
CREATE TRIGGER set_updated_at_manila_account_ministry
BEFORE UPDATE ON "public"."AccountMinistry"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_attendance ON "public"."Attendance";
CREATE TRIGGER set_updated_at_manila_attendance
BEFORE UPDATE ON "public"."Attendance"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_company ON "public"."Company";
CREATE TRIGGER set_updated_at_manila_company
BEFORE UPDATE ON "public"."Company"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_education ON "public"."Education";
CREATE TRIGGER set_updated_at_manila_education
BEFORE UPDATE ON "public"."Education"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_employment ON "public"."Employment";
CREATE TRIGGER set_updated_at_manila_employment
BEFORE UPDATE ON "public"."Employment"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_event ON "public"."Event";
CREATE TRIGGER set_updated_at_manila_event
BEFORE UPDATE ON "public"."Event"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_ministry ON "public"."Ministry";
CREATE TRIGGER set_updated_at_manila_ministry
BEFORE UPDATE ON "public"."Ministry"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_school ON "public"."School";
CREATE TRIGGER set_updated_at_manila_school
BEFORE UPDATE ON "public"."School"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_series ON "public"."Series";
CREATE TRIGGER set_updated_at_manila_series
BEFORE UPDATE ON "public"."Series"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();

DROP TRIGGER IF EXISTS set_updated_at_manila_speaker ON "public"."Speaker";
CREATE TRIGGER set_updated_at_manila_speaker
BEFORE UPDATE ON "public"."Speaker"
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at_manila_local();