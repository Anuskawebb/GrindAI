'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase-client' // Using Google icon from Lucide React
import { Github, ChromeIcon as Google } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grindgrid-bg p-4">
      <Card className="w-full max-w-md bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Login to GrindGrid</CardTitle>
          <CardDescription className="text-grindgrid-text-secondary">
            Enter your credentials to access your dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
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
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
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
            <Button variant="outline" onClick={handleGoogleSignIn} className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light">
              <Google className="mr-2 h-4 w-4" /> Google
            </Button>
            <Button variant="outline" disabled className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-grindgrid-text-secondary">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-grindgrid-accent hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
