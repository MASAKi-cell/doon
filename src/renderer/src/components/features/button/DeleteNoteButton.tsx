import { ActionButton, ActionButtonProps } from './ActionButton'
import style from '@/renderer/src/styles/features/button/deleteNoteButton.module.scss'
import { FaRegTrashCan } from 'react-icons/fa6'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <FaRegTrashCan className={style.wrapper} />
    </ActionButton>
  )
}
