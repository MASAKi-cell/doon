import { useAtom, useAtomValue } from 'jotai'
import { MouseEventHandler } from 'react'

/** store */
import { selectedNoteIndexAtom as selectedNoteIndex, notesAtom } from '@renderer/store/useNotes'

export const useNotesList = ({ onSelect }: { onSelect?: () => void }) => {
  const notes = useAtomValue(notesAtom)
  const [selectedIndex, setSelectedNoteIndex] = useAtom(selectedNoteIndex)

  const handleNoteSelect = (index: number): MouseEventHandler<HTMLDivElement> => {
    setSelectedNoteIndex(index)

    if (onSelect) {
      onSelect()
    }
    return (event: React.MouseEvent<HTMLDivElement>) => {
      console.log(`${event}: Selecting note at index ${index}`)
    }
  }

  return {
    notes,
    selectedIndex,

    /** handle */
    handleNoteSelect
  }
}
