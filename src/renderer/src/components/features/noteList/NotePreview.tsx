import { ComponentPropsWithoutRef } from 'react'

/** utils */
import { toJpString } from '@renderer/utils/dateTime'

/** types */
import type { NoteInfo } from '@renderer/contents/note'
import { longStyle } from '@renderer/contents/enums/index'

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
      <span>{toJpString(lastEditTime, longStyle)}</span>
    </div>
  )
}
