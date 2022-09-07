import { Customer } from "../entity/Customer";
import RepositoryInterface from "./repository.interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
