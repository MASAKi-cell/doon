import { ChangeEvent } from 'react'

/** ReactMarkdown */
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'

/** hooks  */
import { useNoteEditor } from '@renderer/hooks/index'

export const MarkdownEditor = (): JSX.Element => {
  const { selectedNote, handleAutoSave, handleBlur } = useNoteEditor()

  const onChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLTextAreaElement)) {
      return
    }
    handleAutoSave(e.target.value)
  }

  return (
    <div>
      <textarea
        id="markdown"
        name="markdown"
        rows={50}
        cols={33}
        onChange={onChange}
        onBlur={handleBlur}
        value={selectedNote?.content}
      ></textarea>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
      >
        {selectedNote?.content}
      </ReactMarkdown>
    </div>
  )
}
