import { ActionButton, ActionButtonProps } from './ActionButton'
import style from '@/renderer/src/styles/features/button/newNoteButton.module.scss'
import { LuFileSignature } from 'react-icons/lu'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <LuFileSignature className={style.wrapper} />
    </ActionButton>
  )
}
