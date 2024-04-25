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
      <h3 className="mb-1 font-bold truncate">{title}</h3>
      <span className="inline-block w-full mb-2 text-xs font-light text-left"></span>
    </div>
  )
}
