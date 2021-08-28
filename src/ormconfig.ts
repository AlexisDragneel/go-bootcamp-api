import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { Task } from './tasks/entities/task.entity';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: [Task],
  synchronize: true,
};

export default config;
