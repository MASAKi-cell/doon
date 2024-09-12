import { MDXEditorMethods } from '@mdxeditor/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'

/** store */
import { saveNoteAtom, selectedNoteAtom } from '@renderer/store/useNotes'

/** types */
import { NoteContent, NoteInfo } from '@renderer/contents/note'
import { AUTE_SAVING_TIME } from '@renderer/contents/enums'

export const useNoteEditor = () => {
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(saveNoteAtom)
  const editor = useRef<MDXEditorMethods>(null)

  const handleAutoSave = async (content: NoteContent): Promise<void> => {
    if (!content) {
      return
    }

    if (selectedNote?.uuid) {
      const changeNote: NoteInfo = {
        uuid: selectedNote?.uuid,
        title: selectedNote.title,
        content,
        lastEditTime: new Date()
      }
      await window.electron.writeNote(changeNote)
      setTimeout(async () => {
        if (selectedNote) {
          saveNote(), AUTE_SAVING_TIME
        }
      })
    }
  }

  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) {
      return
    }

    const content = editor.current?.getMarkdown()
    if (!!content) {
      await window.electron.writeNote(selectedNote)
    }
  }

  return {
    editor,
    selectedNote,

    /** handle */
    handleBlur,
    handleAutoSave
  }
}
