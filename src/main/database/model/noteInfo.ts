import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { NoteInfo } from '@main/contents/ipc'

@Entity()
export class NoteInfoModel implements NoteInfo {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column()
  title: string

  @Column('datetime')
  lastEditTime: Date
}
