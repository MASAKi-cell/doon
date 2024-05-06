import { ComponentPropsWithoutRef } from 'react'

/** components */
import { NotePreview } from '@renderer/components/features/noteList/NotePreview'

/** mock */
import { NotesMock } from '@renderer/mock/notesMock'

/** styles */
import styles from '@renderer/styles/features/noteList/NoteList.module.scss'

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
  onSelect?: () => void
}

export const NoteList = ({ onSelect, ...props }: NoteListProps) => {
  if (!NotesMock.length) {
    return (
      <ul {...props}>
        <span>No Notes Yet!</span>
      </ul>
    )
  }

  return (
    <ul {...props} className={styles.wrapper}>
      {NotesMock.map((note, i) => (
        <NotePreview key={i + note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
