/** components */
import { ActionButton, ActionButtonProps } from '@renderer/components/features/button/ActionButton'
import delete_icon from '@renderer/assets/delete_icon.svg'
import { useAtomValue, useSetAtom } from 'jotai'

/** store */
import { deleteNoteAtom, selectedNoteAtom } from '@renderer/store/useNotes'

/** scss */
import style from '@renderer/styles/features/button/deleteNoteButton.module.scss'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const handleDelete = async () => {
    const deleteNote = useSetAtom(deleteNoteAtom)
    const selectedNote = useAtomValue(selectedNoteAtom)

    if (!selectedNote) {
      return
    }
    const isDeleted = await window.electron.deleteNote(selectedNote.title)

    if (!isDeleted) {
      return
    }

    deleteNote()
  }

  return (
    <ActionButton onClick={handleDelete} {...props}>
      <img src={delete_icon} className={style.wrapper} />
    </ActionButton>
  )
}
