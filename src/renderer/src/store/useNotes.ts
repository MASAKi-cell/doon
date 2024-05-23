import { unwrap } from 'jotai/utils'
import { atom } from 'jotai'

/** tyes */
import { NoteInfo } from '@renderer/contents/note'

export const useNotes = () => {
  const selectedNoteIndexAtom = atom<number | null>(null)

  const getNotes = atom<Promise<NoteInfo[]>>(async () => {
    const notes = await window.electron.getNote()

    return notes.sort((a, b) => b.lastEditTime.getTime() - a.lastEditTime.getTime())
  })
  const notesAtom = unwrap(getNotes)

  const selectedNote = atom(async (get) => {
    const slectedNoteIndex = get(selectedNoteIndexAtom)
    const notes = get(notesAtom)

    if (!slectedNoteIndex || !notes) return
    const selectedNote = notes[slectedNoteIndex]

    const noteContent = await window.electron.readNote(selectedNote.title)
  })

  return { selectedNoteIndexAtom, getNotes }
}
