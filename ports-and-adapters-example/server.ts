import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan(':method :url :status :response-time ms'));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'ok!' });
});

app.listen(3000);
