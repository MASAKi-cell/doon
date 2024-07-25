import styles from '@renderer/styles/features/editor/markdownEditor.module.scss'

/** tMarkdown */
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'

/** hooks  */
import { useNoteEditor } from '@renderer/hooks/index'

export const MarkdownEditor = (): JSX.Element => {
  const { editor, selectedNote, handleAutoSave, handleBlur } = useNoteEditor()

  const onChange = (markdown: string): void => {
    handleAutoSave(markdown)
  }

  return (
    <section>
      <MDXEditor
        ref={editor}
        className={styles.wrapper}
        key={selectedNote ? selectedNote.title : ''}
        markdown={selectedNote?.content ? selectedNote.content : ''}
        onChange={onChange}
        onBlur={handleBlur}
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          thematicBreakPlugin()
        ]}
      />
    </section>
  )
}
