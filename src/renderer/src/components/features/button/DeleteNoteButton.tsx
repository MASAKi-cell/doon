import { ActionButton, ActionButtonProps } from './ActionButton'
import style from '@/renderer/src/styles/features/button/deleteNoteButton.module.scss'
import delete_icon from '@/renderer/src/assets/delete_icon.svg'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <img src={delete_icon} className={style.wrapper} />
    </ActionButton>
  )
}
