import { ProductPersistenceSqliteAdapter } from '@src/adapters/db/Product';
import { ProductService } from '@src/app/ProductService';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import connection from './src/infra/db/connection';

const app = express();

connection.then(() => console.log('connected'));
app.use(morgan(':method :url :status :response-time ms'));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok!' });
});
app.get('/save', async (req: Request, res: Response) => {
  const persistense = new ProductPersistenceSqliteAdapter();
  const service = new ProductService(persistense);
  const data = await service.create('Random PRoduct', 25.4);
  res.json({ message: 'ok!', data });
});

app.listen(3000);
