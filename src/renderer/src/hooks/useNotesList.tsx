import { useAtom, useAtomValue } from 'jotai'

/** store */
import { selectedNoteIndexAtom as selectedNoteIndex, notesAtom } from '@renderer/store/useNotes'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)

  const [selectedIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndex)

  const handleNoteSelect = (index: number): void => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
  }

  return {
    notes,
    selectedIndex,

    /** handle */
    handleNoteSelect
  }
}
