import { ComponentPropsWithoutRef } from 'react'

/** utils */
import { toStirngWithTz } from '@renderer/utils/dateTime'

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
      <span>{toStirngWithTz(lastEditTime)}</span>
    </div>
  )
}
