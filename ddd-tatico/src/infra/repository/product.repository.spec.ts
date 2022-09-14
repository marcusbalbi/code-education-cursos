import { Sequelize } from "sequelize-typescript";
import Product from "../../domain/product/entity/Product";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "./product.repository";

describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "coca cola", 10);
    await productRepository.create(p1);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "coca cola",
      price: 10,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "coca cola", 10);
    await productRepository.create(p1);

    p1.changeName("pepsi cola");

    await productRepository.update(p1);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel?.toJSON()).toStrictEqual({
      id: "1",
      name: "pepsi cola",
      price: 10,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "coca cola", 10);
    await productRepository.create(p1);

    const saved = await productRepository.find(p1.id);

    expect(saved?.id).toBe(p1.id);
    expect(saved?.name).toBe(p1.name);
    expect(saved?.price).toBe(p1.price);
  });
  it("should findAll products", async () => {
    const productRepository = new ProductRepository();
    const p1 = new Product("1", "coca cola", 10);
    const p2 = new Product("2", "pepsi cola", 9);
    await productRepository.create(p1);
    await productRepository.create(p2);

    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
  });
});
