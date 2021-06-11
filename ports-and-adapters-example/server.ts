import { ProductPersistenceSqliteAdapter } from '@src/adapters/db/Product';
import { ProductService } from '@src/app/ProductService';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import connectionFactory from './src/infra/db/connection';

const app = express();

connectionFactory('app').then(() => console.log('connected'));
app.use(morgan(':method :url :status :response-time ms'));

app.get('/get/:id', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const product = await service.get(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/save', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const data = await service.create('Random PRoduct', 25.4);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message, extras: error.getErrors() });
  }
});

app.listen(3000);
