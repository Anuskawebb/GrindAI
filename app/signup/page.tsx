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
          window.location.href = '/onboarding'
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
      <div className="flex min-h-screen items-center justify-center bg-grindgrid-bg p-4">
        <div className="text-grindgrid-text-secondary">Checking authentication...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grindgrid-bg p-4">
      <Card className="w-full max-w-md bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Sign Up for GrindGrid</CardTitle>
          <CardDescription className="text-grindgrid-text-secondary">
            Create your account to start mastering your skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <Button
              type="submit"
              className="w-full bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-grindgrid-shadow-dark" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-grindgrid-card px-2 text-grindgrid-text-secondary">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light"
              disabled={loading}
            >
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button
              variant="outline"
              disabled
              className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light"
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>

          <div className="mt-4 text-center text-sm text-grindgrid-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-grindgrid-accent hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
