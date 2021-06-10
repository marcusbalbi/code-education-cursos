import { createConnection } from 'typeorm';
import { ProductDBEntity } from '../../adapters/db/Product';

const connection = createConnection({
  type: 'sqlite',
  database: `app.db`,
  entities: [ProductDBEntity],
  logging: true,
});

export default connection;
