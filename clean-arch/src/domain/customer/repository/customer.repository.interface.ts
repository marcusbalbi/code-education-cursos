import RepositoryInterface from "../../@shared/repository/repository.interface";
import { Customer } from "../entity/Customer";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
