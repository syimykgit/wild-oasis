import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://rnvgnirzibyrjnqsegrs.supabase.co";

const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
