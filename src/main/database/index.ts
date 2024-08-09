import { DataSource } from 'typeorm'
import { ormconfig } from '@main/database/typeorm'

/**
 * DB初期化処理
 */
export default class Database {
  public static async createConnection() {
    return new DataSource(ormconfig).initialize()
  }
}
