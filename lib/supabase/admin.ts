import { createClient } from '@supabase/supabase-js'

// Use this strictly on the server-side to perform admin operations
// This bypasses RLS policies!
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
