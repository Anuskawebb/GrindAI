'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePicker } from "@/components/ui/date-picker"
import { DialogFooter } from "@/components/ui/dialog"
import { TablesInsert, TablesUpdate } from '@/types/supabase'
import { createTask, updateTask } from '@/app/dashboard/tasks/actions' // Import Server Actions
import { toast } from 'sonner'

interface TaskFormProps {
  initialData?: TablesUpdate<'tasks'>;
  skills: { id: string; skill_name: string }[]; // Simplified skill type
  onSuccess: () => void;
  onClose: () => void;
}

export function TaskForm({ initialData, skills, onSuccess, onClose }: TaskFormProps) {
  const [taskName, setTaskName] = useState(initialData?.task_name || '');
  const [skillId, setSkillId] = useState(initialData?.skill_id || '');
  const [deadline, setDeadline] = useState<Date | undefined>(initialData?.deadline ? new Date(initialData.deadline) : undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!taskName.trim()) {
      setError('Task name is required.');
      setLoading(false);
      return;
    }
    if (!skillId) {
      setError('Skill is required.');
      setLoading(false);
      return;
    }

    const taskData: TablesInsert<'tasks'> = {
      task_name: taskName,
      skill_id: skillId,
      deadline: deadline?.toISOString().split('T')[0],
      is_completed: initialData?.is_completed || false,
    };

    let result;
    if (initialData?.id) {
      result = await updateTask(initialData.id, taskData);
    } else {
      result = await createTask(taskData);
    }

    if (result.error) {
      setError(result.error);
      toast.error(result.error);
    } else {
      toast.success(initialData?.id ? 'Task updated successfully!' : 'Task added successfully!');
      onSuccess();
      onClose();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="task-name">Task Name</Label>
        <Input
          id="task-name"
          placeholder="e.g., Complete React Router section"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-grindgrid-bg shadow-neumorphic-inset"
          required
        />
      </div>
      <div>
        <Label htmlFor="skill-select">Link to Skill</Label>
        <select
          id="skill-select"
          value={skillId}
          onChange={(e) => setSkillId(e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-grindgrid-bg px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm shadow-neumorphic-inset"
          required
        >
          <option value="">Select a skill</option>
          {skills.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.skill_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="deadline">Deadline</Label>
        <DatePicker
          date={deadline}
          setDate={setDeadline}
          className="bg-grindgrid-bg shadow-neumorphic-inset"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose} disabled={loading} className="bg-grindgrid-bg shadow-neumorphic-sm hover:bg-grindgrid-shadow-light">
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="bg-grindgrid-accent text-white shadow-neumorphic-sm hover:bg-grindgrid-accent/90">
          {loading ? (initialData?.id ? 'Saving...' : 'Adding...') : (initialData?.id ? 'Save Changes' : 'Add Task')}
        </Button>
      </DialogFooter>
    </form>
  );
}
