import { ProductPersistenceSqliteAdapter } from '@src/adapters/db/Product';
import { ProductService } from '@src/app/ProductService';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import connectionFactory from './src/infra/db/connection';

const app = express();

connectionFactory('app.db').then(() => console.log('connected'));
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

app.get('/product/:id', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const product = await service.get(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/product', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const { name, price } = req.body;
    const data = await service.create(name, price);
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, extras: error.getErrors ? error.getErrors() : null });
  }
});

app.put('/product/:id/enable', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const product = await service.get(req.params.id);
    product.setPrice(req.body.price);
    const result = await service.enable(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/product/:id/disable', async (req: Request, res: Response) => {
  try {
    const persistense = new ProductPersistenceSqliteAdapter();
    const service = new ProductService(persistense);
    const product = await service.get(req.params.id);
    product.setPrice(0);
    const result = await service.disable(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
