export const connectionOptions = () => {
  return {
    type: 'mysql',
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'test',
    database: 'test',
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: []
  }
}
