import { createClient } from "@supabase/supabase-js";

console.log(process.env.SUPABASE_DATABASE_URL);

const supabase = createClient(
	process.env.SUPABASE_DATABASE_URL,
	process.env.SUPABASE_ANON_KEY
);

console.log(supabase);
console.log("Hello, world!");