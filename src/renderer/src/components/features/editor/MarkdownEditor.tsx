import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'

const markdown = '### Hi, *Pluto*!'

export const MarkdownEditor = (): JSX.Element => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
    >
      {markdown}
    </Markdown>
  )
}
