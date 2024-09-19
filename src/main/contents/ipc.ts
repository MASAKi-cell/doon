export type NoteInfo = {
  uuid: string
  title: string
  content?: string
  lastEditTime: Date
}

export type NoteContent = string | undefined
export type valueOf<T> = T[keyof T]

/** Notes Types */
export type GetNote = () => Promise<NoteInfo[]>
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>
export type CreateNote = () => Promise<NoteInfo | undefined>
export type DeleteNote = (title: NoteInfo['title']) => Promise<boolean>
