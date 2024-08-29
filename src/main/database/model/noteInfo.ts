import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { NoteInfo } from '@main/contents/ipc'

@Entity('NoteInfoModel')
export class NoteInfoModel implements NoteInfo {
  @PrimaryGeneratedColumn('uuid')
  uuid!: string

  @Column('text', { nullable: false })
  title!: string

  @Column('text', { nullable: true })
  content?: string

  @Column('datetime')
  lastEditTime!: Date
}
