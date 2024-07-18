import { ComponentPropsWithoutRef } from 'react'
import { clsx } from 'clsx'

/** utils */
import { toStirngWithTz } from '@renderer/utils/dateTime'

/** types */
import type { NoteInfo } from '@renderer/contents/note'

/** styles */
import styles from '@renderer/styles/features/noteList/NotePreview.module.scss'

export type NotePreviewProps = ComponentPropsWithoutRef<'div'> &
  NoteInfo & {
    isActive?: boolean
  }

export const NotePreview = ({
  title,
  lastEditTime,
  isActive = false,
  ...props
}: NotePreviewProps) => {
  return (
    <div {...props} className={clsx(styles.wrapper, isActive && styles.active)}>
      <h3>{title}</h3>
      <span>{toStirngWithTz(lastEditTime)}</span>
    </div>
  )
}
