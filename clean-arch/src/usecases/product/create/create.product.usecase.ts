import { v4 as uuid } from "uuid"
import Product from "../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export class CreateProductUseCase {
  constructor(protected repository: ProductRepositoryInterface) {}

  async execute(
    input: InputCreateProductDto
  ): Promise<OutputCreateProductDto | null> {
    const id = uuid()
    const product = new Product(id, input.name, input.price);
    await this.repository.create(product)

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}