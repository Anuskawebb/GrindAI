"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import LoginScreen from "@/components/ui/login-1"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Login page: Checking initial auth state...")

      try {
        // We're not going to redirect here anymore
        // This allows the login page to be displayed
        const {
          data: { user },
        } = await supabase.auth.getUser()

        console.log("👤 Current user:", user?.email || "None")

        // No redirects here - let the middleware handle redirects if needed
      } catch (error) {
        console.error("❌ Error checking auth:", error)
      } finally {
        setCheckingAuth(false)
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    console.log("🔑 Attempting login with:", email)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("❌ Login error:", error)
        setError(error.message)
        return
      }

      if (data.user) {
        console.log("✅ Login successful")

        // Check if user has completed onboarding
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", data.user.id)
          .single()

        if (profileError) {
          console.error("❌ Error fetching profile:", profileError)
        }

        if (profile?.username) {
          console.log("👤 User has username, redirecting to dashboard")
          window.location.href = "/dashboard"
        } else {
          console.log("👤 User needs onboarding, redirecting to onboarding")
          window.location.href = "/onboarding"
        }
      }
    } catch (err: any) {
      console.error("💥 Login exception:", err)
      setError(err.message || "An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("🔍 Attempting Google sign-in")
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) {
        console.error("❌ Google sign-in error:", error)
        setError(error.message)
        setLoading(false)
      }
      // Note: Don't set loading to false on success as user will be redirected to Google
    } catch (err: any) {
      console.error("💥 Google sign-in exception:", err)
      setError(err.message || "An unexpected error occurred")
      setLoading(false)
    }
  }

  // Show loading while checking authentication
  if (checkingAuth) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          <div className="text-gray-600 text-sm">Checking authentication...</div>
        </div>
      </div>
    )
  }

  return (
    <LoginScreen
      isLogin={true}
      onToggleMode={() => {
        router.push("/signup")
      }}
      onSubmit={handleLogin}
      onGoogleSignIn={handleGoogleSignIn}
      loading={loading}
      error={error}
      message={message}
    />
  )
}
