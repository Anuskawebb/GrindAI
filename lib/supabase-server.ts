import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export function createSupabaseServerClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.then(store => store.get(name)?.value)
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.then(store => store.set({ name, value, ...options }))
          } catch (error) {
            // Safe to ignore inside server component
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.then(store => store.set({ name, value: '', ...options }))
          } catch (error) {
            // Safe to ignore inside server component
          }
        },
      },
    }
  )
}
