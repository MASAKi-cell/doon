import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'

export const MarkdownEditor = (): JSX.Element => {
  const [text, setText] = useState<string>('')

  const handletext = (e) => {
    setText(e.target.value)
  }

  return (
    <div>
      <textarea
        id="markdown"
        name="markdown"
        rows={50}
        cols={33}
        onChange={handletext}
        value={text}
      ></textarea>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
