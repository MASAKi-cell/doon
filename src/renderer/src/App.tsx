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

/** jotai DevTools */
import { createStore, Provider } from 'jotai'
import { DevTools } from 'jotai-devtools'
import 'jotai-devtools/styles.css'

/** styles */
import styles from '@renderer/styles/pages/app.module.scss'

function App(): JSX.Element {
  const customStore = createStore()
  return (
    <>
      <Provider store={customStore}>
        <DevTools store={customStore} />
        <TopBar />
        <RootLayout className={styles.wrapper}>
          {/* sidebar */}
          <Sidebar className={styles.sidebar}>
            <ActionButtonsRow className={styles.button} />
            <NoteList />
          </Sidebar>

          {/* content */}
          <Content className={styles.content}>
            <NoteTitle />
            <MarkdownEditor />
          </Content>
        </RootLayout>
      </Provider>
    </>
  )
}

export default App
