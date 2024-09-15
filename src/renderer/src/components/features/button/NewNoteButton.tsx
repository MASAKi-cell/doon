import { useSetAtom } from 'jotai'

/** components */
import { ActionButton, ActionButtonProps } from '@renderer/components/features/button/ActionButton'
import { CreateModal } from '@renderer/components/features/modals/CreateModal'

/** store */
import { createNoteAtom } from '@renderer/store/useNotes'

/** scss */
import style from '@renderer/styles/features/button/newNoteButton.module.scss'
import newNote_icon from '@renderer/assets/newNote_icon.svg'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createNote = useSetAtom(createNoteAtom)
  const handleAddNote = async (): Promise<void> => {
    const title: string | false = await window.electron.createNote()

    if (!title) {
      return
    }

    createNote(title)
  }

  return (
    <>
      <ActionButton onClick={handleAddNote} {...props}>
        <img src={newNote_icon} className={style.wrapper} />
      </ActionButton>
      <CreateModal />
    </>
  )
}
