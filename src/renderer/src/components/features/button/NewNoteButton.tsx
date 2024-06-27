/** components */
import { AddButton, AddButtonProps } from '@renderer/components/features/button/AddButton'

/** scss */
import style from '@renderer/styles/features/button/newNoteButton.module.scss'
import newNote_icon from '@renderer/assets/newNote_icon.svg'

export const NewNoteButton = ({ ...props }: AddButtonProps) => {
  return (
    <AddButton {...props}>
      <img src={newNote_icon} className={style.wrapper} />
    </AddButton>
  )
}
