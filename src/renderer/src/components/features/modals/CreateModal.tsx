import { ComponentPropsWithoutRef, useState } from 'react'

export type CreatModalProps = ComponentPropsWithoutRef<'input'> & {
  isOpen?: boolean
  onConfirm: (title: string) => void
  onCancel: () => void
}

export const creatModal = ({ isOpen, onConfirm, onCancel }: CreatModalProps) => {
  const [title, setTitle] = useState('')
  if (!isOpen) {
    return null
  }

  const handleConfirm = () => {
    if (title) onConfirm(title)
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>新しいノートを作成しますか？</h2>
        <input
          type="text"
          placeholder="タイトルを入力"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleConfirm}>はい</button>
          <button onClick={onCancel}>いいえ</button>
        </div>
      </div>
    </div>
  )
}
