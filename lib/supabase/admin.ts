import { createClient } from '@supabase/supabase-js'

// Use this strictly on the server-side to perform admin operations.
// This bypasses RLS policies!
// Uses empty string fallback so the module does not crash at build-time
// when Vercel collects page data without env vars loaded.
// At actual request time, NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
// must be set in Vercel's Environment Variables settings or calls will fail.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
)
