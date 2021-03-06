import { createConnection } from 'typeorm';
import { ProductDBEntity } from '../../adapters/db/Product';

const connectionFactory = (dbname, logging = false) => {
  return createConnection({
    type: 'sqlite',
    database: `${dbname}`,
    entities: [ProductDBEntity],
    logging,
  });
};

export default connectionFactory;
