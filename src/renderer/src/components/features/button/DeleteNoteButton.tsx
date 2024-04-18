/** components */
import { ActionButton, ActionButtonProps } from '@renderer/components/features/button/ActionButton'
import delete_icon from '@renderer/assets/delete_icon.svg'

/** scss */
import style from '@renderer/styles/features/button/deleteNoteButton.module.scss'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <img src={delete_icon} className={style.wrapper} />
    </ActionButton>
  )
}
