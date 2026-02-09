-- Remove the permissive UPDATE policy that allows anyone to modify news
DROP POLICY IF EXISTS "Enable update access for all users" ON public.economic_news;

-- Create a restrictive policy: only service_role can update (via edge functions)
CREATE POLICY "Deny public update access to economic_news"
ON public.economic_news
FOR UPDATE
USING (false)
WITH CHECK (false);