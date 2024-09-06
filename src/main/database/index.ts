import { DataSource } from 'typeorm'
import { ormconfig } from '@main/database/typeorm'

/**
 * DB初期化処理
 */
export default class Database {
  private static _conn?: DataSource

  public static async createConnection(): Promise<DataSource> {
    if (!this._conn) {
      this._conn = new DataSource(ormconfig)
      await this._conn.initialize()
      await this._conn.runMigrations() // マイグレーションの実行
    }
    return this._conn
  }

  public static async close(): Promise<void> {
    if (!this._conn) {
      return
    }
    if (this._conn && this._conn.isInitialized) {
      await this._conn.destroy()
    }
    this._conn = undefined
  }
}
