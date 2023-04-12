import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export class FindProductUseCase {
  constructor(protected repository: ProductRepositoryInterface) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto | null> {
    const product = await this.repository.find(input.id);
    if (!product) return null;

    return {
      id: product.id,
      name: product.name,
      price: product.price
    };
  }
}