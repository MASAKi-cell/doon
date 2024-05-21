import { atom } from 'jotai'

export const useNotes = () => {
  const selectedNoteIndex = atom<number | null>(null)

  const getNotes = async () => {
    const notes = await window.electron.getNote()

    return notes.sort((a, b) => b.lastEditTime - a.lastEditTime)
  }

  return { selectedNoteIndex, getNotes }
}
