import { ComponentPropsWithoutRef } from 'react'

/** components */
import { DeleteNoteButton, NewNoteButton } from '@renderer/components/features/button/index'

export const AddButtonsRow = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...props}>
      <NewNoteButton />
      <DeleteNoteButton />
    </div>
  )
}
