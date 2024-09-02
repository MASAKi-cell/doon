import path from 'path'
import { DataSourceOptions } from 'typeorm'
import { NoteInfoModel } from '@main/database/model/noteInfo'

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: path.join(__dirname, __dirname + '/database/resources/database.sqlite'),
  entities: [NoteInfoModel],
  migrations: [`${path.join(__dirname, '/database/migrations')}/*.js`],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: true,
  logging: true
}
