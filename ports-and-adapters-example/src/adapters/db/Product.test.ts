import { ProductFactory } from '@src/app/Product';
import { getConnection } from 'typeorm';
import connectionFactory from '../../infra/db/connection';
import { ProductPersistenceSqliteAdapter } from './Product';

describe('DB Product.test', () => {
  beforeAll(async (done) => {
    connectionFactory(':memory:').then(async () => {
      await getConnection().dropDatabase();
      // use migration instead
      await getConnection().query(`CREATE TABLE "products" (
        "id"	TEXT UNIQUE,
        "name"	TEXT NOT NULL,
        "status"	TEXT,
        "price"	REAL,
        PRIMARY KEY("id")
    )`);
      done();
    });
    // const sqlite = new sqlite
  });

  it('should save', async (done) => {
    const persistance = new ProductPersistenceSqliteAdapter();
    const product = ProductFactory.createNewProduct();
    product.setName('test save');
    const result = await persistance.save(product);
    expect(result.getID()).toEqual(product.getID());
    expect(result.getName()).toEqual(product.getName());

    product.setName('new name');
    const result2 = await persistance.save(product);
    expect(result2.getName()).toEqual(product.getName());
    expect(result2.getID()).toEqual(product.getID());

    done();
  });
});
