import { ComponentProps } from 'react'

/** scss */
import style from '@renderer/styles/features/button/addButton.module.scss'

export type AddButtonProps = ComponentProps<'button'>

export const AddButton = ({ children, ...props }: ComponentProps<'button'>) => {
  const handleAdd = async () => {}

  return (
    <button className={style.wrapper} {...props}>
      {children}
    </button>
  )
}
