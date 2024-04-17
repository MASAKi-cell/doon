export { NoteInfo } from 'src/renderer/src/contents/note'

export type NotePreviewProps = NoteInfo & {
  isActive?: boolean
} & ComponentProps<'div'>
