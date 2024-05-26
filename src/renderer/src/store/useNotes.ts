import { unwrap } from 'jotai/utils'
import { atom } from 'jotai'

/** tyes */
import { NoteContent, NoteInfo } from '@renderer/contents/note'

// TODO: jotaiをテストする。
export const useNotes = () => {
  const selectedNoteIndex = atom<number | null>(null)

  const getNotes = async () => {
    const notes = await window.electron.getNote()
    return notes.sort((a, b) => b.lastEditTime.getTime() - a.lastEditTime.getTime())
  }
  const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(getNotes())
  const notesAtom = unwrap(notesAtomAsync)

  /** note選択 */
  const selectedNote = atom(async (get) => {
    const index = get(selectedNoteIndex)
    const notes = get(notesAtom)

    if (!index || !notes) {
      return
    }

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

  /**
   * noteの保存
   */
  const saveNote = atom(null, async (get, set, newContent: NoteContent) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) {
      return
    }

    await window.electron.writeNote(selectedNote.title, newContent)

    set(
      notesAtom,
      notes.filter((note) =>
        note.title === selectedNote.title
          ? {
              ...note,
              lastEditTime: Date.now()
            }
          : note
      )
    )
  })

  /**
   * noteの新規作成
   */
  const creatNote = atom(null, async (get, set) => {
    const notes = get(notesAtom)

    if (!notes) {
      return
    }

    const title = await window.electron.createNote()
    if (!title) {
      return
    }

    const newNote = {
      title,
      lastEditTime: new Date()
    }
    set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
    set(selectedNoteIndex, 0)
  })

  /**
   * noteの削除
   */
  const deleteNote = atom(null, async (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!notes || !selectedNote) {
      return
    }

    const isDeleted = await window.electron.deleteNote(selectedNote.title)

    if (!isDeleted) {
      return
    }

    set(
      notesAtom,
      notes.filter((note) => note.title !== selectedNote.title)
    )
  })

  return { creatNote, saveNote, deleteNote }
}
