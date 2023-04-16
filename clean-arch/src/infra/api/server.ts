import dotenv from 'dotenv';
import {app} from './express';

dotenv.config()
const port = Number(process.env.port || 3000);

app.listen(port, () => {
  console.log("listening on port ", port)
});