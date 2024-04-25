import { ComponentPropsWithoutRef } from 'react'

export const NoteTitle = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div {...props}>
      <span></span>
    </div>
  )
}
