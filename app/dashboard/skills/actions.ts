'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TablesInsert, TablesUpdate } from '@/types/supabase'

export async function createSkill(skill: TablesInsert<'skills'>) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { data, error } = await (await supabase)
    .from('skills')
    .insert({ ...skill, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error('Error creating skill:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard') // Revalidate overview page for skill progress update
  return { data }
}

export async function updateSkill(id: string, skill: TablesUpdate<'skills'>) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { data, error } = await (await supabase)
    .from('skills')
    .update(skill)
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only update their own skills
    .select()
    .single()

  if (error) {
    console.error('Error updating skill:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard') // Revalidate overview page for skill progress update
  return { data }
}

export async function deleteSkill(id: string) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { error } = await (await supabase)
    .from('skills')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only delete their own skills

  if (error) {
    console.error('Error deleting skill:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/skills')
  revalidatePath('/dashboard') // Revalidate overview page
  return { success: true }
}
