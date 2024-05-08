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
        {/* sidebar */}
        <Sidebar className={styles.sidebar}>
          <ActionButtonsRow className={styles.button} />
          <NoteList />
        </Sidebar>

        {/* content */}
        <Content className={styles.content}>
          <textarea
            id="markdown"
            name="markdown"
            rows={50}
            cols={33}
            placeholder="Markdown をここに入力2"
          ></textarea>
          <NoteTitle />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
