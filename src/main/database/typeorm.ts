import path from 'path'
import { DataSourceOptions } from 'typeorm'
import { NoteInfoModel } from '@main/database/model/noteInfo'

console.log(path.join(__dirname, '/database/migrations'))

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: __dirname + 'database/resources/database.sqlite',
  entities: [NoteInfoModel],
  migrations: [`${path.join(__dirname, '/database/migrations')}/*.js`],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: false,
  logging: true
}
