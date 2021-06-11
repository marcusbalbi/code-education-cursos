import { createConnection } from 'typeorm';
import { ProductDBEntity } from '../../adapters/db/Product';

const connectionFactory = (dbname) => {
  return createConnection({
    type: 'sqlite',
    database: `${dbname}.db`,
    entities: [ProductDBEntity],
    logging: true,
  });
};

export default connectionFactory;
