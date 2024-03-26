import { ComponentProps, forwardRef } from 'react'
import styles from '@/renderer/src/styles/features/layout/appLayout.module.scss'

export const Root = ({ className, children, ...props }: ComponentProps<'main'>) => {
  return (
    <main className={(styles.border, className)} {...props}>
      {children}
    </main>
  )
}

export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside className={className} {...props}>
      {children}
    </aside>
  )
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    )
  }
)
