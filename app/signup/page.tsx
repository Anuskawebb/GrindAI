"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase-client"
import LoginScreen from "@/components/ui/login-1"

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Signup page: Checking initial auth state...")

      try {
        // We're not going to redirect here anymore
        // This allows the signup page to be displayed
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

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    setMessage(null)

    console.log("📝 Attempting signup with:", email)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("❌ Signup error:", error)
        setError(error.message)
        return
      }

      if (data.user) {
        if (data.user.email_confirmed_at) {
          console.log("✅ User immediately confirmed")
          // Wait a moment for the session to be established
          await new Promise((resolve) => setTimeout(resolve, 500))

          // Redirect to onboarding since this is a new user
          console.log("📝 New user, redirecting to onboarding")
          window.location.href = "/onboarding"
        } else {
          console.log("📧 Email confirmation required")
          setMessage("Check your email for a confirmation link to complete your signup!")
        }
      } else {
        setMessage("Signup successful! Please check your email to confirm your account.")
      }
    } catch (err: any) {
      console.error("💥 Signup exception:", err)
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
        <div className="flex items-center space-x-2 text-gray-600">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500"></div>
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  return (
    <LoginScreen
      isLogin={false}
      onToggleMode={() => {
        router.push("/login")
      }}
      onSubmit={handleSignUp}
      onGoogleSignIn={handleGoogleSignIn}
      loading={loading}
      error={error}
      message={message}
    />
  )
}
