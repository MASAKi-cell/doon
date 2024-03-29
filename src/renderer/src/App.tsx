import { Root, Sidebar, Content } from '@/renderer/src/components/index'

function App(): JSX.Element {
  const ipcHandle = (): Promise<void> => window.electron.sendPing()

  return (
    <>
      <Root>
        <Sidebar>Sidebar</Sidebar>
        <Content>
          {' '}
          Build an Electron app with <span className="react">React</span>
          &nbsp;and <span className="ts">TypeScript</span>
        </Content>
      </Root>
    </>
  )
}

export default App
