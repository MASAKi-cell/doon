import { DeleteNoteButton, NewNoteButton } from './button/index'
import { ComponentPropsWithoutRef } from 'react'

export const ActionButtonsRow = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
