import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	import.meta.env.SUPABASE_DATABASE_URL,
	import.meta.env.SUPABASE_ANON_KEY
);

console.log(supabase);