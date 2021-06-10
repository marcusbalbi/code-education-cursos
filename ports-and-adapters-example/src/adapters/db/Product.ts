import {
  Product,
  ProductInterface,
  ProductPersistenceInterface,
  ProductStatus,
} from '@src/app/Product';
import { Column, Entity, getConnection, PrimaryColumn, Repository } from 'typeorm';

@Entity({
  name: 'products',
})
export class ProductDBEntity {
  @PrimaryColumn({
    type: 'varchar',
    generated: false,
  })
  id: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'varchar',
  })
  status: string;

  @Column({
    type: 'double',
  })
  price: Number;
}

export class ProductPersistenceSqliteAdapter implements ProductPersistenceInterface {
  private con: Repository<ProductDBEntity>;
  constructor() {
    this.con = getConnection().getRepository(ProductDBEntity);
  }
  async get(id: string): Promise<ProductInterface> {
    const dbData = await this.con.find({ where: { id: id } });
    if (dbData.length <= 0) {
      return null;
    }
    const product = new Product();
    product.setID(dbData[0].id);
    product.setName(dbData[0].name);
    product.setPrice(dbData[0].price);
    if (dbData[0].status === ProductStatus.ENABLED) {
      product.enable();
    }
    return product;
  }
  async save(product: ProductInterface): Promise<ProductInterface> {
    const data = {
      id: product.getID(),
      name: product.getName(),
      status: product.getStatus(),
      price: 0,
    };
    await this.con.save(data);
    return product;
  }
}
