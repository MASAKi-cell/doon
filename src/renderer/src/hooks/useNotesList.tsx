import { useNotes } from '@renderer/store/useNotes'
import { useAtom, useAtomValue } from 'jotai'

export const usenotesList = ({ onSelect }: { onSelect?: () => void }) => {
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
    handleNoteSelect
  }
}
