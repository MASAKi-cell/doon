import { ComponentPropsWithoutRef } from 'react'

type NoteListProps = ComponentPropsWithoutRef<'ul'> & {
  onSelect?: () => void
}
