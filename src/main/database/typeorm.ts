import path from 'path'
import { DataSourceOptions } from 'typeorm'
import { NoteInfoModel } from '@main/database/model/noteInfo'
import { getHomeDir } from '@main/utils/index'

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: path.join(getHomeDir(), 'src/main/database/resources/database.sqlite'),
  entities: [NoteInfoModel],
  migrations: [path.join(getHomeDir(), 'src/main/database/migrations/*.js')],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: true,
  logging: false
}
