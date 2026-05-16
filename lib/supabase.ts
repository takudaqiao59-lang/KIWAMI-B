// This file is deprecated. Use the SSR clients instead:
// - Client-side: import { createClient } from '@/lib/supabase/client'
// - Server-side: import { createClient } from '@/lib/supabase/server'
// - Middleware: import { updateSession } from '@/lib/supabase/middleware'

// For backward compatibility, re-export the client
export { createClient } from '@/lib/supabase/client'

export async function getServerClient() {
  const { createClient } = await import('@/lib/supabase/server')
  return createClient()
}
