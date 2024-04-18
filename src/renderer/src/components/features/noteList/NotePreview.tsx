import { ComponentPropsWithoutRef } from 'react'

/** types */
import type { NoteInfo } from 'src/renderer/src/contents/note'

export type NotePreviewProps = ComponentPropsWithoutRef<'div'> &
  NoteInfo & {
    isActive?: boolean
  }
