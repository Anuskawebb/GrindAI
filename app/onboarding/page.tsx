'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase-client'
import { DatePicker } from '@/components/ui/date-picker' // Assuming a DatePicker component exists or will be created

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [skillName, setSkillName] = useState('')
  const [username, setUsername] = useState('')
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [studyHours, setStudyHours] = useState<number | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleNext = () => {
    setError(null)
    if (step === 1) {
      if (!skillName.trim()) {
        setError('Please enter a primary skill name.')
        return
      }
      if (!username.trim()) {
        setError('Please choose a username.')
        return
      }
    }
    if (step === 2 && !deadline) {
      setError('Please set a deadline.')
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('User not authenticated. Please log in again.')
      setLoading(false)
      return
    }

    try {
      // Update user profile with username
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', user.id)

      if (profileError) {
        throw profileError
      }

      // For now, let's just focus on creating the first skill
      const { error: skillError } = await supabase
        .from('skills')
        .insert({
          user_id: user.id,
          skill_name: skillName,
          deadline: deadline?.toISOString().split('T')[0], // Format to YYYY-MM-DD
          // You might want to add study_hours to a user_settings table or similar
        })

      if (skillError) {
        throw skillError
      }

      router.push('/dashboard') // Redirect to dashboard after onboarding
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during onboarding.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grindgrid-bg p-4">
      <Card className="w-full max-w-md bg-grindgrid-card shadow-neumorphic rounded-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-grindgrid-text-primary">Welcome to GrindGrid!</CardTitle>
          <CardDescription className="text-grindgrid-text-secondary">
            Let's set up your first skill.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <Label htmlFor="username">Choose a username</Label>
              <Input
                id="username"
                placeholder="e.g., skillmaster"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
              />
              <Label htmlFor="skill-name">What's the primary skill you want to master?</Label>
              <Input
                id="skill-name"
                placeholder="e.g., React Development, Data Science"
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label htmlFor="deadline">When do you want to achieve this skill by?</Label>
              {/* DatePicker component from shadcn/ui or custom */}
              <DatePicker
                date={deadline}
                setDate={setDeadline}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label htmlFor="study-hours">How many hours do you plan to study per day?</Label>
              <Input
                id="study-hours"
                type="number"
                placeholder="e.g., 2"
                value={studyHours}
                onChange={(e) => setStudyHours(Number(e.target.value))}
                className="bg-grindgrid-bg shadow-neumorphic-inset"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} disabled={loading} className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light">
                Previous
              </Button>
            )}
            {step < 3 && (
              <Button onClick={handleNext} disabled={loading} className="ml-auto bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
                Next
              </Button>
            )}
            {step === 3 && (
              <Button onClick={handleSubmit} disabled={loading} className="ml-auto bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
                {loading ? 'Finishing...' : 'Finish Onboarding'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
