import { ComponentProps, forwardRef } from 'react'

export const RootLayout = ({ children, ...props }: ComponentProps<'main'>) => {
  return <main {...props}>{children}</main>
}

export const Sidebar = ({ children, ...props }: ComponentProps<'aside'>) => {
  return <aside {...props}>{children}</aside>
}

export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  }
)
