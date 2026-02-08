import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.meta.env.SUPABASE_DATABASE_URL,
	process.meta.env.SUPABASE_ANON_KEY
);

console.log(supabase);