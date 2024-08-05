import { DataSource } from 'typeorm'
import { ormconfig } from '@main/database/typeorm'

export default class Database {
  public static async createConnection() {
    return new DataSource(ormconfig).initialize()
  }
}
