import Product from "../../../domain/product/entity/Product";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export class ListProductUseCase {
  constructor(protected repository: ProductRepositoryInterface) {}

  private toOutput (product: Product) {
    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }

  async execute(
    input: InputListProductDto
  ): Promise<OutputListProductDto> {
    const products = await this.repository.findAll();

    return {
      products: products.map(c => this.toOutput(c))
    }
  }
}
