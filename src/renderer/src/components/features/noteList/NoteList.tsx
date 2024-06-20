import { ComponentPropsWithoutRef } from 'react'

/** components */
import { NotePreview } from '@renderer/components/features/noteList/NotePreview'

/** styles */
import styles from '@renderer/styles/features/noteList/NoteList.module.scss'

/** hooks */
import { useNotesList } from '@renderer/hooks/index'

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
  onSelect?: () => void
}

export const NoteList = ({ onSelect, ...props }: NoteListProps) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({ onSelect })

  if (!notes) return null

  if (!notes.length) {
    return (
      <ul {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul {...props} className={styles.wrapper}>
      {notes.map((note, i) => (
        <NotePreview
          key={i + note.title + note.lastEditTime}
          isActive={selectedNoteIndex === i}
          onClick={handleNoteSelect(i)}
          {...note}
        />
      ))}
    </ul>
  )
}
