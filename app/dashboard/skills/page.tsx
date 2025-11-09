'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SkillForm } from '@/components/skill-form'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'  // ✅ use browser client
import { Tables } from '@/types/supabase'
import { deleteSkill } from './actions'
import { toast } from 'sonner'

type Skill = Tables<'skills'>;

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | undefined>(undefined)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    setLoading(true)
    const supabase = createSupabaseBrowserClient() // ✅ no await here

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError) {
      console.error('Error fetching user:', userError)
      toast.error('Failed to get user.')
      setLoading(false)
      return
    }

    if (user) {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching skills:', error)
        toast.error('Failed to load skills.')
      } else {
        setSkills(data || [])
      }
    }

    setLoading(false)
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const result = await deleteSkill(id)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Skill deleted successfully!')
        fetchSkills()
      }
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingSkill(undefined)
  }

  const handleFormSuccess = () => {
    fetchSkills()
  }

  return (
    <div className="grid gap-6 w-full">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Skills</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingSkill(undefined)}
              className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white shadow-sm rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-gray-900">{editingSkill ? 'Edit Skill' : 'Add New Skill'}</DialogTitle>
              <DialogDescription className="text-gray-600">
                {editingSkill
                  ? 'Make changes to your skill here.'
                  : 'Add a new skill to your learning journey.'}
              </DialogDescription>
            </DialogHeader>
            <SkillForm
              initialData={editingSkill}
              onSuccess={handleFormSuccess}
              onClose={handleModalClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Skills List</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0">
          {loading ? (
            <p className="text-gray-500 text-center">
              Loading skills...
            </p>
          ) : skills.length === 0 ? (
            <p className="text-gray-500 text-center">
              No skills added yet. Click "Add Skill" to get started!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {skills.map((skill) => (
                    <tr key={skill.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {skill.skill_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {skill.start_date
                          ? new Date(skill.start_date).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {skill.deadline
                          ? new Date(skill.deadline).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {skill.progress_percentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(skill)}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(skill.id)}
                          className="text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
