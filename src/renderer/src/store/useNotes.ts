import { unwrap } from 'jotai/utils'
import { atom } from 'jotai'

/** tyes */
import { NoteInfo } from '@renderer/contents/note'

// TODO:jotaiをテストする
// TODO： Idで判別させる
export const useNotes = () => {
  const getNotes = async () => {
    const notes = await window.electron.getNotes()
    return notes.sort((a, b) => b.lastEditTime.getTime() - a.lastEditTime.getTime())
  }

  const selectedNoteIndex = atom<number | null>(0)
  const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(getNotes())
  const notesAtom = unwrap(notesAtomAsync, (prev) => prev ?? [])

  /**
   * note選択
   */
  const selectedNoteAtomAync = atom(async (get) => {
    const index = get(selectedNoteIndex)
    const notes = get(notesAtom)

    if (index === null || !notes.length) {
      return null
    }

    const selectedNote = notes[index]
    const noteContent = await window.electron.readNote(selectedNote.title)

    return { ...selectedNote, content: noteContent }
  })

  const selectedNoteAtom = unwrap(
    selectedNoteAtomAync,
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
  const handleSaveNote = atom(null, (get, set) => {
    const notes = get(notesAtom)
    const selectedNote = get(selectedNoteAtom)

    if (!selectedNote || !notes) {
      return
    }

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
  const handleCreatNote = atom(null, async (get, set) => {
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
  const handleDeleteNote = atom(null, async (get, set) => {
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

  return {
    /** variable */
    notesAtom,
    selectedNoteIndex,
    selectedNoteAtom,

    /** handle */
    handleCreatNote,
    handleSaveNote,
    handleDeleteNote
  }
}
