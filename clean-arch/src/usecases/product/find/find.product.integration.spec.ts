import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/Product";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductModel from "../../../infra/product/sequelize/product.model";
import { FindProductUseCase } from "./find.product.usecase";

describe("test Find product Usecase", () => {
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
  it("should find a product", async () => {
    const product = new Product("123", "Pizza", 29.90);
    const repository = new ProductRepository();
    await repository.create(product);

    const input = {
      id: "123",
    };

    const expected = {
      id: "123",
      name: "Pizza",
      price: 29.90
    };

    const usecase = new FindProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(expected)
  });
});
