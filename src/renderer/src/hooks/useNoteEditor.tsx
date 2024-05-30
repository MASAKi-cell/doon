import { MDXEditorMethods } from '@mdxeditor/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'

/** store */
import { useNotes } from '@renderer/store/index'

export const useNoteEditor = () => {
  const { selectedNoteAtom, handleSaveNote } = useNotes()
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(handleSaveNote)
  const editor = useRef<MDXEditorMethods>(null)

  const handleBlur = async (): Promise<void> => {
    if (!selectedNote) {
      return
    }

    const content = editor.current?.getMarkdown() ?? ''

    await saveNote(content)
  }

  return {
    /** handle */
    handleBlur
  }
}
