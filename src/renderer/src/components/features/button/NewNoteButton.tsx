import { ActionButton, ActionButtonProps } from './ActionButton'
import style from '@/renderer/src/styles/features/button/newNoteButton.module.scss'
import newNote_icon from '@/renderer/src/assets/newNote_icon.svg'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <img src={newNote_icon} className={style.wrapper} />
    </ActionButton>
  )
}
