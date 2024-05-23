import { unwrap } from 'jotai/utils'
import { atom } from 'jotai'

/** tyes */
import { NoteContent, NoteInfo } from '@renderer/contents/note'

export const useNotes = () => {
  const selectedNoteIndex = atom<number | null>(null)

  const getNotes = atom<Promise<NoteInfo[]>>(async () => {
    const notes = await window.electron.getNote()

    return notes.sort((a, b) => b.lastEditTime.getTime() - a.lastEditTime.getTime())
  })
  const notesAtom = unwrap(getNotes)

  /** note選択 */
  const selectedNote = atom(async (get) => {
    const index = get(selectedNoteIndex)
    const notes = get(notesAtom)

    if (!index || !notes) return
    const selectedNote = notes[index]

    const noteContent = await window.electron.readNote(selectedNote.title)

    return { ...selectedNote, content: noteContent }
  })

  const selectedNoteAtom = unwrap(
    selectedNote,
    (prev) =>
      prev ?? {
        title: '',
        content: '',
        lastEditTime: Date.now()
      }
  )

  /** noteの保存 */
  const saveNote = atom(null, (get, set, newContent: NoteContent) => {})

  /** noteの新規作成 */
  const creatNote = atom(null, async (get, set) => {})

  /** noteの削除 */
  const deleteNote = atom(null, async (get, set) => {})

  return { selectedNoteIndexAtom, getNotes }
}
