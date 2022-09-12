import Order from "../entity/Order";
import RepositoryInterface from "./repository.interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
