import { createServerClient } from '@supabase/ssr'

export const createServer = async () => {
  // Dynamically import cookies to ensure this runs only in server context
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

export const createServiceRoleServer = () => {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get: () => '',
        set: () => {},
        remove: () => {},
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  )
}