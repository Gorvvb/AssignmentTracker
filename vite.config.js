import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		define: {
			"process.env.SUPABASE_DATABASE_URL": JSON.stringify(env.SUPABASE_DATABASE_URL),
			"process.env.SUPABASE_ANON_KEY": JSON.stringify(env.SUPABASE_ANON_KEY),
		},
	};
});
