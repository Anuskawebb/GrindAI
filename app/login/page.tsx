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
import { Github, ChromeIcon as Google } from "lucide-react"

export default function LoginPage() {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
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
      <div className="min-h-screen w-full flex items-center justify-center bg-grindgrid-bg px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-grindgrid-accent"></div>
          <div className="text-grindgrid-text-secondary text-sm">Checking authentication...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-grindgrid-bg px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card className="w-full bg-grindgrid-card shadow-neumorphic rounded-xl border-0 overflow-hidden">
          <CardHeader className="text-center space-y-2 px-6 pt-8 pb-6">
            <div className="mx-auto w-16 h-16 bg-grindgrid-accent rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-grindgrid-text-secondary text-base">
              Log in to continue mastering your skills with GrindGrid
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-5">
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
                  className="w-full h-12 bg-grindgrid-bg shadow-neumorphic-inset border-0 rounded-lg px-4 text-grindgrid-text-primary placeholder:text-grindgrid-text-secondary/60 focus:ring-2 focus:ring-grindgrid-accent focus:ring-offset-0 transition-all duration-200"
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
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-grindgrid-bg shadow-neumorphic-inset border-0 rounded-lg px-4 text-grindgrid-text-primary placeholder:text-grindgrid-text-secondary/60 focus:ring-2 focus:ring-grindgrid-accent focus:ring-offset-0 transition-all duration-200"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {message && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-green-600 text-sm font-medium">{message}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 bg-grindgrid-accent hover:bg-grindgrid-accent/90 text-white font-semibold shadow-neumorphic-sm rounded-lg transition-all duration-200 hover:shadow-neumorphic focus:ring-2 focus:ring-grindgrid-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log In"
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
                className="h-12 bg-grindgrid-bg hover:bg-grindgrid-shadow-light border-0 shadow-neumorphic-sm hover:shadow-neumorphic text-grindgrid-text-primary font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                <Google className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button
                variant="outline"
                disabled
                className="h-12 bg-grindgrid-bg border-0 shadow-neumorphic-sm text-grindgrid-text-secondary/50 font-medium rounded-lg cursor-not-allowed"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-grindgrid-text-secondary">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-grindgrid-accent hover:text-grindgrid-accent/80 transition-colors duration-200 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
