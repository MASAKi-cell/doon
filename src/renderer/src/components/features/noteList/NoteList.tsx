import { ComponentPropsWithoutRef } from 'react'

/** components */
import { NotePreview } from '@renderer/components/features/noteList/NotePreview'

/** mock */
import { NotesMock } from '@renderer/mock/notesMock'

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
  onSelect?: () => void
}

export const NoteList = ({ onSelect, ...props }: NoteListProps) => {
  return (
    <ul {...props}>
      {NotesMock.map((note, i) => (
        <NotePreview key={i + note.title + note.lastEditTime} {...note} />
      ))}
    </ul>
  )
}
