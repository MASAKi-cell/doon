import { atom } from 'jotai'

export const useNotes = () => {
  const selectedNoteIndex = atom<number | null>(null)

  return { selectedNoteIndex }
}
