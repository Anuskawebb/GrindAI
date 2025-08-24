import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Tables } from '@/types/supabase'
import { TaskListClient } from '@/components/task-list-client'

type Task = Tables<'tasks'>;
type Skill = Tables<'skills'>;

export default async function TasksPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  let tasks: Task[] = [];
  let skills: Skill[] = [];

  if (user) {
    const { data: tasksData, error: tasksError } = await (await supabase)
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('deadline', { ascending: true });

    const { data: skillsData, error: skillsError } = await (await supabase)
      .from('skills')
      .select('*')
      .eq('user_id', user.id)
      .order('skill_name', { ascending: true });

    if (tasksError) {
      console.error('Error fetching tasks:', tasksError);
      // In a real app, you might want to display a user-friendly error message
    } else {
      tasks = tasksData || [];
    }

    if (skillsError) {
      console.error('Error fetching skills:', skillsError);
      // In a real app, you might want to display a user-friendly error message
    } else {
      skills = skillsData || [];
    }
  }

  return (
    <TaskListClient initialTasks={tasks} initialSkills={skills} />
  );
}
