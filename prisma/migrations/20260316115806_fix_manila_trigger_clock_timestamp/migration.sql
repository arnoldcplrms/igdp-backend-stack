CREATE OR REPLACE FUNCTION public.set_updated_at_manila_local()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
	NEW."updatedAt" := timezone('Asia/Manila'::text, clock_timestamp());
	RETURN NEW;
END;
$$;