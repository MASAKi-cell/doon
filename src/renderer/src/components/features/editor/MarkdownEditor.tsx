import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  linkPlugin
} from '@mdxeditor/editor'

export const MarkdownEditor = () => {
  return (
    <MDXEditor
      markdown={''}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        markdownShortcutPlugin(),
        thematicBreakPlugin(),
        linkPlugin()
      ]}
    ></MDXEditor>
  )
}
