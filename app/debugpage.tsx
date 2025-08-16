"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const [authState, setAuthState] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser()
        const {
          data: { session },
        } = await supabase.auth.getSession()

        // Check profile if user exists
        let profileData = null
        if (user) {
          const { data, error: profileError } = await supabase.from("profiles").select("*").eq("id", user.id).single()
          profileData = { data, error: profileError?.message }
        }

        setAuthState({
          user: user
            ? {
                id: user.id,
                email: user.email,
                created_at: user.created_at,
                email_confirmed_at: user.email_confirmed_at,
                user_metadata: user.user_metadata,
              }
            : null,
          session: session
            ? {
                access_token: session.access_token ? "EXISTS" : "MISSING",
                refresh_token: session.refresh_token ? "EXISTS" : "MISSING",
                expires_at: session.expires_at,
                expires_in: session.expires_in,
              }
            : null,
          profile: profileData,
          error: error?.message || null,
          cookies: document.cookie,
          localStorage: {
            supabaseAuth: localStorage.getItem("sb-avkxhxtmbtxnvgrrmkle-auth-token") ? "EXISTS" : "MISSING",
            allKeys: Object.keys(localStorage),
          },
          url: window.location.href,
          userAgent: navigator.userAgent,
        })
      } catch (err: any) {
        setAuthState({
          error: err.message,
          user: null,
          session: null,
        })
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const clearAuth = async () => {
    await supabase.auth.signOut()
    localStorage.clear()
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })
    window.location.reload()
  }

  const testLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: "test@example.com",
        password: "testpassword123",
      })
      console.log("Test login result:", { data, error })
      alert(`Test login: ${error ? error.message : "Success"}`)
    } catch (err: any) {
      console.error("Test login error:", err)
      alert(`Test login error: ${err.message}`)
    }
  }

  if (loading) {
    return <div className="p-8">Loading debug info...</div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Debug Info</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
            {JSON.stringify(authState, null, 2)}
          </pre>
          <div className="mt-4 space-x-2">
            <button onClick={clearAuth} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Clear All Auth Data
            </button>
            <button onClick={testLogin} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Test Login
            </button>
            <a
              href="/test-dashboard"
              className="inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Dashboard
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
