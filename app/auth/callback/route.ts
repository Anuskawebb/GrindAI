import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const supabase = createSupabaseServerClient()

  try {
    // Exchange the code for a session
    if (code) {
      console.log('🔄 Exchanging code for session')
      try {
        await (await supabase).auth.exchangeCodeForSession(code)
      } catch (exchangeError) {
        console.error('❌ Error exchanging code for session:', exchangeError)
        return NextResponse.redirect(requestUrl.origin + '/login?error=session_exchange_failed', { status: 302 })
      }
    }

    // Check if user has completed onboarding
    try {
      const { data: { user }, error: userError } = await (await supabase).auth.getUser()
      
      if (userError || !user) {
        console.error('❌ Error getting user or no user found:', userError)
        return NextResponse.redirect(requestUrl.origin + '/login?error=user_not_found', { status: 302 })
      }
      
      console.log('✅ User authenticated:', user.email)
      
      try {
        const { data: profileData, error: profileError } = await (await supabase)
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single()
        
        if (profileError) {
          console.error('❌ Error fetching profile:', profileError)
          return NextResponse.redirect(requestUrl.origin + '/onboarding', { status: 302 })
        }
        
        if (profileData?.username) {
          console.log('🏠 User has username, redirecting to dashboard')
          return NextResponse.redirect(requestUrl.origin + '/dashboard', { status: 302 })
        } else {
          console.log('📝 User needs to complete onboarding')
          return NextResponse.redirect(requestUrl.origin + '/onboarding', { status: 302 })
        }
      } catch (profileError) {
        console.error('❌ Error fetching profile:', profileError)
        return NextResponse.redirect(requestUrl.origin + '/onboarding', { status: 302 })
      }
    } catch (userError) {
      console.error('❌ Error getting user:', userError)
      return NextResponse.redirect(requestUrl.origin + '/login?error=auth_user_error', { status: 302 })
    }
  } catch (error) {
    console.error('💥 Auth callback error:', error)
    return NextResponse.redirect(requestUrl.origin + '/login?error=auth_callback_failed', { status: 302 })
  }
}
