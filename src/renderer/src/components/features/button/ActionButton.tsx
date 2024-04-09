import style from '@/renderer/src/styles/features/button/actionButton.module.scss'
import { ComponentProps } from 'react'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ children, ...props }: ComponentProps<'button'>) => {
  return (
    <button className={style.wrapper} {...props}>
      {children}
    </button>
  )
}
