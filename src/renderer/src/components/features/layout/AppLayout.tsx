import styles from '@/styles/features/layout/AppLayout.module.scss'
import { ComponentProps } from 'react'

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={(styles.border, className)} {...props}>
      {children}{' '}
    </aside>
  )
}
