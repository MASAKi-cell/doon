import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin
} from '@mdxeditor/editor'

/** hooks  */
import { useNoteEditor } from '@renderer/hooks/index'

export const MarkdownEditor = () => {
  const { editor, selectedNote, handleAutoSave, handleBlur } = useNoteEditor()

  if (!selectedNote?.content) {
    return null
  }

  return (
    <MDXEditor
      ref={editor}
      key={selectedNote.title}
      markdown={selectedNote.content}
      onChange={handleAutoSave}
      onBlur={handleBlur}
      plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), markdownShortcutPlugin()]}
    />
  )
}
