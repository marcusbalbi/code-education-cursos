import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/Product";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductModel from "../../../infra/product/sequelize/product.model";
import { ListProductUseCase } from "./list.product.usecase";

describe("test Listing product Usecase Integration", () => {
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
  it("should list products", async () => {
    const product1 = new Product("1", "Pizza", 29.90);
    const product2 = new Product("2", "Hamburguer", 19.90);
    const repository = new ProductRepository();
    await repository.create(product1);
    await repository.create(product2);

    const usecase = new ListProductUseCase(repository);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[1].name).toBe(product2.name);
  });
});
