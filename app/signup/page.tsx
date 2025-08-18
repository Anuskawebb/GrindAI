"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase-client"
import { Github, ChromeIcon as Google, UserPlus, Loader2 } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
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
      <div className="min-h-screen w-full flex items-center justify-center bg-grindgrid-bg px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 text-grindgrid-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Checking authentication...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-grindgrid-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="bg-grindgrid-card shadow-neumorphic rounded-2xl border-0">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-12 h-12 bg-grindgrid-accent rounded-full flex items-center justify-center shadow-neumorphic-sm">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-grindgrid-text-primary">Join GrindGrid</CardTitle>
              <CardDescription className="text-grindgrid-text-secondary text-base">
                Create your account to start mastering your skills
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 px-6 pb-6">
            <form onSubmit={handleSignUp} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-grindgrid-text-primary">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-grindgrid-bg shadow-neumorphic-inset border-0 text-grindgrid-text-primary placeholder:text-grindgrid-text-secondary/60 focus:shadow-neumorphic-inset-focus transition-all duration-200"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-grindgrid-text-primary">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a strong password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-grindgrid-bg shadow-neumorphic-inset border-0 text-grindgrid-text-primary placeholder:text-grindgrid-text-secondary/60 focus:shadow-neumorphic-inset-focus transition-all duration-200"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">{error}</div>
              )}

              {message && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm">
                  {message}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90 hover:shadow-neumorphic transition-all duration-200 font-medium text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-grindgrid-shadow-dark/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-grindgrid-card px-3 text-grindgrid-text-secondary font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="h-12 bg-grindgrid-bg shadow-neumorphic-sm hover:shadow-neumorphic border-0 text-grindgrid-text-primary hover:bg-grindgrid-shadow-light transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Google className="mr-2 h-4 w-4" />
                    Google
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                disabled
                className="h-12 bg-grindgrid-bg shadow-neumorphic-sm border-0 text-grindgrid-text-secondary/50 cursor-not-allowed"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-grindgrid-text-secondary">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-grindgrid-accent hover:text-grindgrid-accent/80 transition-colors duration-200"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
