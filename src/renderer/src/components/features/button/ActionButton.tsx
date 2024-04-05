import { ComponentProps } from 'react'

export const ActionButton = ({ children, ...props }: ComponentProps<'button'>) => {
  return <button {...props}>{children}</button>
}
