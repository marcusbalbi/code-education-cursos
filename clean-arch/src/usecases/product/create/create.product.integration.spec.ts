import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infra/product/repository/product.repository";
import ProductModel from "../../../infra/product/sequelize/product.model";
import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Pizza",
  price: 29.9,
};
describe("test Create product Usecase", () => {
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
    const repository = new ProductRepository();

    const expected = {
      id: expect.any(String),
      name: "Pizza",
      price: 29.90
    };

    const usecase = new CreateProductUseCase(repository);

    const output = await usecase.execute(input);

    expect(output).toEqual(expected)
  });
});
