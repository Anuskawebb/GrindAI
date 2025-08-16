'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { Slider } from "@/components/ui/slider"
import { DialogFooter } from "@/components/ui/dialog"
import { TablesInsert, TablesUpdate } from '@/types/supabase'
import { createSkill, updateSkill } from '@/app/dashboard/skills/actions'
import { toast } from 'sonner'

interface SkillFormProps {
  initialData?: TablesUpdate<'skills'>;
  onSuccess: () => void;
  onClose: () => void;
}

export function SkillForm({ initialData, onSuccess, onClose }: SkillFormProps) {
  const [skillName, setSkillName] = useState(initialData?.skill_name || '')
  const [startDate, setStartDate] = useState<Date | undefined>(initialData?.start_date ? new Date(initialData.start_date) : new Date())
  const [deadline, setDeadline] = useState<Date | undefined>(initialData?.deadline ? new Date(initialData.deadline) : undefined)
  const [progressPercentage, setProgressPercentage] = useState<number[]>(initialData?.progress_percentage ? [initialData.progress_percentage] : [0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!skillName.trim()) {
      setError('Skill name is required.')
      setLoading(false)
      return
    }

    const skillData: TablesInsert<'skills'> = {
      skill_name: skillName,
      start_date: startDate?.toISOString().split('T')[0],
      deadline: deadline?.toISOString().split('T')[0],
      progress_percentage: progressPercentage[0],
    }

    let result;
    if (initialData?.id) {
      result = await updateSkill(initialData.id, skillData);
    } else {
      result = await createSkill(skillData);
    }

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success(initialData?.id ? 'Skill updated successfully!' : 'Skill added successfully!');
      onSuccess();
      onClose();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="skill-name">Skill Name</Label>
        <Input
          id="skill-name"
          placeholder="e.g., React Development"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          className="bg-grindgrid-bg shadow-neumorphic-inset"
          required
        />
      </div>
      <div>
        <Label htmlFor="start-date">Start Date</Label>
        <DatePicker
          date={startDate}
          setDate={setStartDate}
          className="bg-grindgrid-bg shadow-neumorphic-inset"
        />
      </div>
      <div>
        <Label htmlFor="deadline">Deadline</Label>
        <DatePicker
          date={deadline}
          setDate={setDeadline}
          className="bg-grindgrid-bg shadow-neumorphic-inset"
        />
      </div>
      <div>
        <Label htmlFor="progress">Progress ({progressPercentage[0]}%)</Label>
        <Slider
          id="progress"
          min={0}
          max={100}
          step={1}
          value={progressPercentage}
          onValueChange={setProgressPercentage}
          className="w-full mt-2"
          // Custom styles for the slider to match neumorphic design
          trackClassName="relative h-2 w-full grow overflow-hidden rounded-full bg-grindgrid-shadow-dark"
          rangeClassName="absolute h-full bg-grindgrid-accent rounded-full"
          thumbClassName="block h-5 w-5 rounded-full border-2 border-grindgrid-accent bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
          {loading ? (initialData?.id ? 'Saving...' : 'Adding...') : (initialData?.id ? 'Save Changes' : 'Add Skill')}
        </Button>
      </DialogFooter>
    </form>
  )
}
