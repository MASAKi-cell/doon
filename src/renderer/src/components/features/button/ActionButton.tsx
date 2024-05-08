import { ComponentProps } from 'react'

/** scss */
import style from '@renderer/styles/features/button/actionButton.module.scss'

export type ActionButtonProps = ComponentProps<'button'>

export const ActionButton = ({ children, ...props }: ComponentProps<'button'>) => {
  const click = () => {
    console.log('click')
  }

  return (
    <button className={style.wrapper} {...props} onClick={click}>
      {children}
    </button>
  )
}
