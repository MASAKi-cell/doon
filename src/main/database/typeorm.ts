import { homedir } from 'os'
import { DataSourceOptions } from 'typeorm'

export const ormconfig: DataSourceOptions = {
  type: 'sqlite',
  database: 'src/main/database/resources/database.sqlite',
  entities: [`${homedir()}/model/*.js`],
  migrations: [`${homedir()}/migrations/*.js`],
  migrationsRun: true, // マイグレーション同時実行
  synchronize: false
}
