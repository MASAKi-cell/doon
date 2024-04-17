import { ComponentPropsWithoutRef } from 'react'

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
