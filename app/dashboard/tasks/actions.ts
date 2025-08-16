'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TablesInsert, TablesUpdate } from '@/types/supabase'

export async function createTask(task: TablesInsert<'tasks'>) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({ ...task, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error('Error creating task:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/tasks')
  revalidatePath('/dashboard') // Revalidate overview page for task updates
  return { data }
}

export async function updateTask(id: string, updates: TablesUpdate<'tasks'>) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only update their own tasks
    .select()
    .single()

  if (error) {
    console.error('Error updating task:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/tasks')
  revalidatePath('/dashboard') // Revalidate overview page for task updates
  return { data }
}

export async function deleteTask(id: string) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only delete their own tasks

  if (error) {
    console.error('Error deleting task:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/tasks')
  revalidatePath('/dashboard') // Revalidate overview page
  return { success: true }
}
