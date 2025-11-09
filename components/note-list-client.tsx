'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useActionState } from 'react'
import { toast } from 'sonner'
import { createNote, updateNote, deleteNote } from '@/app/dashboard/notes/actions'
import { Tables } from '@/types/supabase'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2 } from 'lucide-react'

type Note = Tables<'notes'>;

interface NoteListClientProps {
  initialNotes: Note[];
}

export function NoteListClient({ initialNotes }: NoteListClientProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [noteContent, setNoteContent] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editNoteContent, setEditNoteContent] = useState('');
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [noteToDeleteId, setNoteToDeleteId] = useState<string | null>(null);

  // useActionState for creating new notes
  const [createState, createFormAction, isCreatePending] = useActionState(async (_: any, formData: FormData) => {
    const content = formData.get('noteContent') as string;
    const result = await createNote(content);
    if (result.error) {
      toast.error(result.error);
      return { success: false, message: result.error };
    } else {
      toast.success('Note saved successfully!');
      setNoteContent(''); // Clear the textarea on success
      if (result.data) {
        setNotes(prevNotes => [result.data!, ...prevNotes]); // Add new note to the top
      }
      return { success: true, message: 'Note saved successfully!' };
    }
  }, null);

  // useActionState for updating notes
  const [updateState, updateFormAction, isUpdatePending] = useActionState(async (_: any, formData: FormData) => {
    if (!editingNote) return { success: false, message: 'No note selected for editing.' };
    const content = formData.get('editNoteContent') as string;
    const result = await updateNote(editingNote.id, content);
    if (result.error) {
      toast.error(result.error);
      return { success: false, message: result.error };
    } else {
      toast.success('Note updated successfully!');
      setIsEditModalOpen(false); // Close modal on success
      setEditingNote(null);
      setNotes(prevNotes => prevNotes.map(n => n.id === result.data?.id ? result.data : n)); // Update note in state
      return { success: true, message: 'Note updated successfully!' };
    }
  }, null);

  // Update notes state if initialNotes prop changes (e.g., after revalidation from other actions)
  useEffect(() => {
    setNotes(initialNotes);
  }, [initialNotes]);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setEditNoteContent(note.content);
    setIsEditModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setNoteToDeleteId(id);
    setIsDeleteConfirmOpen(true);
  };

  const executeDelete = async () => {
    if (noteToDeleteId) {
      const result = await deleteNote(noteToDeleteId);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Note deleted successfully!');
        setNotes(prevNotes => prevNotes.filter(n => n.id !== noteToDeleteId)); // Remove note from state
      }
      setNoteToDeleteId(null);
      setIsDeleteConfirmOpen(false);
    }
  };

  return (
    <div className="grid gap-6 w-full">
      <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">New Note</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0">
          <form action={createFormAction}>
            <Textarea
              placeholder="Start typing your notes here..."
              className="min-h-[200px] bg-gray-50 border-gray-200"
              name="noteContent"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              disabled={isCreatePending}
            />
            <Button
              type="submit"
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
              disabled={isCreatePending}
            >
              {isCreatePending ? 'Saving...' : 'Save Note'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-xl shadow-sm border-none">
        <CardHeader className="p-7 pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">All Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-7 pt-0">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-center">No notes added yet. Start writing a new note!</p>
          ) : (
            <ul className="space-y-4">
              {notes.map((note) => (
                <li key={note.id} className="p-4 rounded-lg bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {note.content.split('\n')[0]}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {note.content.split('\n').slice(1).join(' ') || 'No additional content'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Saved: {new Date(note.created_at!).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0 sm:ml-4">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(note)} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit note</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => confirmDelete(note.id)} className="text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete note</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Edit Note Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white shadow-sm rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit Note</DialogTitle>
            <DialogDescription className="text-gray-600">
              Make changes to your note here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form action={updateFormAction}>
            <Textarea
              name="editNoteContent"
              value={editNoteContent}
              onChange={(e) => setEditNoteContent(e.target.value)}
              className="min-h-[200px] bg-gray-50 border-gray-200"
              disabled={isUpdatePending}
            />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)} disabled={isUpdatePending} className="bg-white border-gray-200 hover:bg-gray-50">
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdatePending} className="bg-orange-500 hover:bg-orange-600 text-white">
                {isUpdatePending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent className="bg-white shadow-sm rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              This action cannot be undone. This will permanently delete your note.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white border-gray-200 hover:bg-gray-50">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeDelete} className="bg-red-500 hover:bg-red-600 text-white">
              Yes, delete note
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
