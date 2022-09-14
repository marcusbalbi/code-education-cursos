import Product from "../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../domain/product/repository/product.repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    });
  }
  async update(entity: Product): Promise<void> {
    await ProductModel.update({
      name: entity.name,
      price: entity.price
    }, {
      where: { id: entity.id }
    })
  }
  async find(id: string): Promise<Product | null> {
    const model = await ProductModel.findOne({ where: { id } });
    if (!model) return null;

    return new Product(model.id, model.name, model.price);
  }
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll({});
    return products.map((p) => {
      return new Product(p.id, p.name, p.price);
    })
  }
}
