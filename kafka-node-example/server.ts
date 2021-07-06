import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ "mensagem": "Ola!"})
});

app.listen(3000);
