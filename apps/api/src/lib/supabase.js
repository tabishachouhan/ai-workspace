import { createClient } from "@supabase/supabase-js";
import ws from "ws";
import { env } from "../config/env.js";

export const supabase = createClient(env.supabase.url, env.supabase.serviceRoleKey, {
  auth: { persistSession: false },
  realtime: { transport: ws },
});