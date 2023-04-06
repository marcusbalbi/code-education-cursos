import RepositoryInterface from "../../@shared/repository/repository.interface";
import Product from "../entity/Product";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
