'use server'

import { revalidatePath } from 'next/cache'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { TablesInsert, TablesUpdate } from '@/types/supabase'

export async function createNote(content: string) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  if (!content.trim()) {
    return { error: 'Note content cannot be empty.' }
  }

  const { data, error } = await (await supabase)
    .from('notes')
    .insert({ user_id: user.id, content: content })
    .select()
    .single()

  if (error) {
    console.error('Error creating note:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/notes') // Revalidate the notes page
  revalidatePath('/dashboard') // Revalidate the dashboard page for recent notes
  return { data }
}

export async function updateNote(id: string, content: string) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  if (!content.trim()) {
    return { error: 'Note content cannot be empty.' }
  }

  const { data, error } = await (await supabase)
    .from('notes')
    .update({ content: content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only update their own notes
    .select()
    .single()

  if (error) {
    console.error('Error updating note:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/notes')
  revalidatePath('/dashboard')
  return { data }
}

export async function deleteNote(id: string) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await (await supabase).auth.getUser()

  if (!user) {
    return { error: 'User not authenticated.' }
  }

  const { error } = await (await supabase)
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Ensure user can only delete their own notes

  if (error) {
    console.error('Error deleting note:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/notes')
  revalidatePath('/dashboard')
  return { success: true }
}
