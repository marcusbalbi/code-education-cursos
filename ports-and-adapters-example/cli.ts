import ProductCli from '@src/adapters/cli/Product';
import { ProductPersistenceSqliteAdapter } from '@src/adapters/db/Product';
import { ProductService } from '@src/app/ProductService';
import connectionFactory from './src/infra/db/connection';
const prompts = require('prompts');

const init = async () => {
  await connectionFactory('app');
  console.log('database connected!');
};

const questions = [
  {
    type: 'select',
    name: 'action',
    message: 'Escolha uma Ação para um Produto!',
    choices: [
      { title: 'Cadastrar', value: 'create' },
      { title: 'Habilitar', value: 'enable' },
      { title: 'Desabilitar', value: 'disable' },
      { title: 'Encontrar', value: '' },
    ],
  },
  {
    type: (prev) => (prev !== 'create' ? 'text' : null),
    name: 'product_id',
    message: 'Digite o Id do Produto',
  },
  {
    type: (_, values) => (values.action === 'create' ? 'text' : null),
    name: 'product_name',
    message: 'Digite o Nome do Produto',
  },
  {
    type: (_, values) => (['create', 'enable'].includes(values.action) ? 'text' : null),
    name: 'product_price',
    message: 'Digite o Preço do Produto',
  },
];

(async () => {
  await init();
  const persistense = new ProductPersistenceSqliteAdapter();
  const service = new ProductService(persistense);
  const response = await prompts(questions);
  const result = await ProductCli(
    service,
    response.action,
    response.product_id,
    response.product_name,
    response.product_price,
  );
  console.log(result);
})();
