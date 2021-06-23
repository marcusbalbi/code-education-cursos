import { ProductFactory, ProductInterface, ProductPersistenceInterface } from '@src/app/Product';
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
  price: number;
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
    return ProductFactory.create(dbData[0]);
  }
  async save(product: ProductInterface): Promise<ProductInterface> {
    const data = {
      id: product.getID(),
      name: product.getName(),
      status: product.getStatus(),
      price: product.getPrice(),
    };
    await this.con.save(data);
    return product;
  }
}
