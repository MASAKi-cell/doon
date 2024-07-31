import path from 'path'
import { DataSourceOptions } from 'typeorm'

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [`${path.join(__dirname, '/model')}/*.js`],
  migrations: [`${path.join(__dirname, '/migrations')}/*.js`],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: false
}
