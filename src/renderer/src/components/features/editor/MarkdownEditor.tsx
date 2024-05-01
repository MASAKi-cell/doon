import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const markdown = `\`\`\`js
console.log('Hello, world!');
\`\`\`
`

export const MarkdownEditor = () => {
  return (
    <Markdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
      {markdown}
    </Markdown>
  )
}
