import path from 'path'
import { DataSourceOptions } from 'typeorm'

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: __dirname + 'database/resources/database.sqlite',
  entities: [`${path.join(__dirname, 'database/resources/model')}/*.js`],
  migrations: [`${path.join(__dirname, 'database/resources/migrations')}/*.js`],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: false
}
