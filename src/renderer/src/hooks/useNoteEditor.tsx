import { MDXEditorMethods } from '@mdxeditor/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'

/** store */
import { useNotes } from '@renderer/store/index'

/** types */
import { NoteContent } from '@renderer/contents/note'
import { AUTE_SAVING_TIME } from '@renderer/contents/enums'

export const useNoteEditor = () => {
  const { selectedNoteAtom, handleSaveNote } = useNotes()
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(handleSaveNote)
  const editor = useRef<MDXEditorMethods>(null)

  const handleAutoSave = async (content: NoteContent): Promise<void> => {
    if (!content) {
      return
    }
    setTimeout(async () => {
      if (selectedNote) {
        await window.electron.writeNote(selectedNote.title, content)
        saveNote(), AUTE_SAVING_TIME
      }
    })
  }

  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) {
      return
    }

    await saveNote()
  }

  return {
    editor,
    selectedNote,

    /** handle */
    handleBlur,
    handleAutoSave
  }
}
