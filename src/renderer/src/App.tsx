import { Root, Sidebar, Content } from '@/renderer/src/components/index'
import styles from '@/renderer/src/styles/pages/app.module.scss'

function App(): JSX.Element {
  const ipcHandle = (): Promise<void> => window.electron.sendPing()

  return (
    <>
      <Root className={styles.wrapper}>
        <Sidebar className={styles.sidebar}>Sidebar</Sidebar>
        <Content className={styles.content}>
          {' '}
          Build an Electron app with <span className="react">React</span>
          &nbsp;and <span className="ts">TypeScript</span>
        </Content>
      </Root>
    </>
  )
}

export default App
