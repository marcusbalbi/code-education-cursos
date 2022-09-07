import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/entity/Product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";


describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();

  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "coca cola", 10);
    await productRepository.create(p1);

    const productModel = await ProductModel.findOne({ where: { id: "1" } })

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "coca cola",
      price: 10
    })

  })

})
