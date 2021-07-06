import { createConnection } from 'typeorm';

const connectionFactory = (dbname, logging = false) => {
  return createConnection({
    type: 'sqlite',
    database: `${dbname}`,
    entities: [],
    logging,
  });
};

export default connectionFactory;
