import { MDXEditorMethods } from '@mdxeditor/editor'
import { useAtomValue, useSetAtom } from 'jotai'
import { useRef } from 'react'
import { useNotes } from '@renderer/store/index'

export const useNoteEditor = () => {
  const { selectedNoteAtom, handleSaveNote } = useNotes()
  const selectedNote = useAtomValue(selectedNoteAtom)
  const saveNote = useSetAtom(handleSaveNote)
}
