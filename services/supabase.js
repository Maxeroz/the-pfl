import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yvrznaatibycprzttwgu.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2cnpuYWF0aWJ5Y3ByenR0d2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMDMyNTksImV4cCI6MjAzNjU3OTI1OX0.MDI1MnaqBduqYm0Sqom39u6q0PQk_M3TKoDckJ-y3v4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
