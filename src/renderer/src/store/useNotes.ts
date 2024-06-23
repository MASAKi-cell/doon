import { unwrap } from 'jotai/utils'
import { atom } from 'jotai'

/** tyes */
import { NoteInfo } from '@renderer/contents/note'

// TODO:jotaiをテストする
// TODO： Idで判別させる
const getNotes = async () => {
  const notes = await window.electron.getNotes()
  return notes.sort((a, b) => b.lastEditTime.getTime() - a.lastEditTime.getTime())
}

const notesAtomAsync = atom<NoteInfo[] | Promise<NoteInfo[]>>(getNotes())
export const notesAtom = unwrap(notesAtomAsync, (prev) => prev)

export const selectedNoteIndexAtom = atom<number | null>(null)

/**
 * note選択
 */
const selectedNoteAtomAsync = atom(async (get) => {
  const notes = get(notesAtom)
  const index = get(selectedNoteIndexAtom)

  if (index === null || !notes) {
    return null
  }

  const selectedNote = notes[index]
  const noteContent = await window.electron.readNote(selectedNote.title)

  return {
    ...selectedNote,
    content: noteContent
  }
})

export const selectedNoteAtom = unwrap(
  selectedNoteAtomAsync,
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
export const saveNoteAtom = atom(null, (get, set) => {
  const notes = get(notesAtom)
  const selectedNote = get(selectedNoteAtom)

  if (!selectedNote || !notes) return

  set(
    notesAtom,
    notes.map((note) => {
      if (note.title === selectedNote.title) {
        return {
          ...note,
          lastEditTime: new Date()
        }
      }

      return note
    })
  )
})

/**
 * noteの新規作成
 */
export const createEmptyNoteAtom = atom(null, async (get, set) => {
  const notes = get(notesAtom)
  if (!notes) {
    return
  }

  const title = await window.electron.createNote()

  if (!title) {
    return
  }

  const newNote: NoteInfo = {
    title,
    lastEditTime: new Date()
  }

  set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])
  set(selectedNoteIndexAtom, 0)
})

/**
 * noteの削除
 */
export const deleteNoteAtom = atom(null, async (get, set) => {
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
  set(selectedNoteIndexAtom, null)
})
