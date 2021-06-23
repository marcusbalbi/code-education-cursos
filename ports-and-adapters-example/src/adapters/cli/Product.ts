import { ProductServiceInterface } from '@src/app/Product';

async function runProductCli(
  productService: ProductServiceInterface,
  action: string,
  productid: string,
  productName: string,
  productPrice: number,
): Promise<string> {
  switch (action) {
    case 'create': {
      const productCreated = await productService.create(productName, productPrice);
      return `Product with id ${productCreated.getID()} and name ${productCreated.getName()} and price ${productCreated.getPrice()} created`;
    }
    case 'enable': {
      const product = await productService.get(productid);
      product.setPrice(productPrice);
      const productEnabled = await productService.enable(product);
      return `Product with id ${productEnabled.getID()} and name ${productEnabled.getName()} enabled!`;
    }
    case 'disable': {
      const product = await productService.get(productid);
      product.setPrice(0);
      const productEnabled = await productService.disable(product);
      return `Product with id ${productEnabled.getID()} and name ${productEnabled.getName()} disabled!`;
    }
    default: {
      const product = await productService.get(productid);
      return `Product:
ID: ${product.getID()}
Name: ${product.getName()}
Price: ${product.getPrice()}
Status: ${product.getStatus()}`;
    }
  }
}

export default runProductCli;
