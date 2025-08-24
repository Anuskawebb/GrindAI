// REMOVED: 'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createNote } from './actions' // Import the new Server Action
import { useActionState } from 'react' // Import useActionState
import { toast } from 'sonner' // Import toast for notifications
import { createSupabaseServerClient } from '@/lib/supabase-server' // For initial data fetch
import { Tables } from '@/types/supabase'
import { NoteListClient } from '@/components/note-list-client' // Import the new client component

type Note = Tables<'notes'>;

export default async function NotesPage() {
  const supabase = createSupabaseServerClient();
  const { data: { user } } = await (await supabase).auth.getUser();

  let notes: Note[] = [];

  if (user) {
    const { data, error } = await (await supabase)
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }); // Order by most recent

    if (error) {
      console.error('Error fetching notes:', error);
      // In a real app, you might want to display a user-friendly error message
    } else {
      notes = data || [];
    }
  }

  return (
    <NoteListClient initialNotes={notes} />
  );
}
