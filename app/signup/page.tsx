'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase-client'
import { Github, ChromeIcon as Google } from 'lucide-react'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
    } else if (data.user) {
      setMessage('Check your email for a confirmation link to complete your signup!')
      // Optionally redirect to a confirmation page or login page after email confirmation
      // router.push('/login');
    } else {
      setMessage('Signup successful! Please check your email to confirm your account.')
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
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <Button type="submit" className="w-full bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
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
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-grindgrid-accent hover:underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
