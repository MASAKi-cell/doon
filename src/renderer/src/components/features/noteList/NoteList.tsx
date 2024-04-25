import { ComponentPropsWithoutRef } from 'react'

/** components */
import { NotePreview } from '@renderer/components/features/noteList/NotePreview'

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
  onSelect?: () => void
}

export const NoteList = ({ onSelect, ...props }: NoteListProps) => {
  return (
    <ul {...props}>
      <span>No Notes Yet</span>
    </ul>
  )
}
