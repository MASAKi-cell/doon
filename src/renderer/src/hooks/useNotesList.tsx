import { useNotes } from '@renderer/store/index'
import { useAtom, useAtomValue } from 'jotai'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const { selectedNoteIndex, selectedNoteAtom } = useNotes()
  const notes = useAtomValue(selectedNoteAtom)
  const [selectedIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndex)

  const handleNoteSelect = (index: number) => {
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
