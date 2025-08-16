import { NextResponse, type NextRequest } from "next/server"
import { createServerClient, type CookieOptions } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const pathname = request.nextUrl.pathname

  console.log("🔍 Middleware processing:", pathname)

  // Allow access to public routes without any checks
  if (
    pathname === "/" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/debug") ||
    pathname.startsWith("/simple-test") ||
    pathname.includes(".")
  ) {
    console.log("✅ Public route, allowing access")
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    const isAuthenticated = !authError && user !== null

    console.log("🔐 Auth status:", {
      pathname,
      isAuthenticated,
      userId: user?.id,
      email: user?.email,
      authError: authError?.message,
    })

    // Handle unauthenticated users
    if (!isAuthenticated) {
      console.log("❌ User not authenticated")

      // Allow access to login and signup pages
      if (pathname === "/login" || pathname === "/signup") {
        console.log("✅ Allowing access to auth pages")
        return response
      }

      // Redirect to login for protected routes
      if (pathname.startsWith("/dashboard") || pathname.startsWith("/onboarding")) {
        console.log("🚫 Redirecting to login")
        return NextResponse.redirect(new URL("/login", request.url), { status: 302 })
      }

      return response
    }

    // Handle authenticated users
    if (isAuthenticated && user) {
      console.log("✅ User authenticated:", user.email)

      // Check onboarding status
      let isOnboardingComplete = false
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single()

        if (!profileError && profileData && profileData.username) {
          isOnboardingComplete = true
        }

        console.log("📋 Onboarding status:", {
          isOnboardingComplete,
          username: profileData?.username,
          profileError: profileError?.message,
        })
      } catch (error) {
        console.error("❌ Error checking profile:", error)
        isOnboardingComplete = false
      }

      // Allow authenticated users to access login and signup pages
      // This prevents immediate redirects and allows the pages to be displayed
      if (pathname === "/login" || pathname === "/signup") {
        console.log("✅ Allowing authenticated user to view auth pages")
        return response
      }

      // Handle onboarding flow
      if (!isOnboardingComplete && !pathname.startsWith("/onboarding")) {
        console.log("📝 Redirecting to onboarding")
        return NextResponse.redirect(new URL("/onboarding", request.url), { status: 302 })
      }

      if (isOnboardingComplete && pathname.startsWith("/onboarding")) {
        console.log("🏠 Redirecting completed user to dashboard")
        return NextResponse.redirect(new URL("/dashboard", request.url), { status: 302 })
      }
    }

    return response
  } catch (error) {
    console.error("💥 Middleware error:", error)
    // On error, allow the request to proceed
    return response
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
