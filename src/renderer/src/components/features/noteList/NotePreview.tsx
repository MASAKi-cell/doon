import { ComponentPropsWithoutRef } from 'react'

/** types */
import type { NoteInfo } from '@renderer/contents/note'

export type NotePreviewProps = ComponentPropsWithoutRef<'div'> &
  NoteInfo & {
    isActive?: boolean
  }

export const NotePreview = ({
  title,
  content,
  lastEditTime,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  return (
    <div {...props}>
      <h3>{title}</h3>
      <span>{lastEditTime}</span>
    </div>
  )
}
