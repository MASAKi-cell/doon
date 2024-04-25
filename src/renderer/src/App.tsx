/** components */
import {
  RootLayout,
  Sidebar,
  Content,
  TopBar,
  ActionButtonsRow,
  NoteList,
  MarkdownEditor,
  NoteTitle
} from '@renderer/components/index'

/** styles */
import styles from '@renderer/styles/pages/app.module.scss'

function App(): JSX.Element {
  return (
    <>
      <TopBar />
      <RootLayout className={styles.wrapper}>
        <Sidebar className={styles.sidebar}>
          <ActionButtonsRow className={styles.button} />
          <NoteList />
        </Sidebar>

        <Content className={styles.content}>
          {' '}
          Build an Electron app with <span className="react">React</span>
          &nbsp;and <span className="ts">TypeScript</span>
          <NoteTitle />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
