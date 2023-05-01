import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/Customer";
import * as yup from "yup";
export class CustomerYupValidator implements ValidatorInterface<Customer> {
  validate(entity: Customer): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("ID is required"),
          name: yup.string().required("Name is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
          },
          {
            abortEarly: false,
          }
        );
    } catch (e) {
      const { errors } = e as yup.ValidationError;
      errors.forEach((error) => {
        entity.notification.addError({
          context: "customer",
          message: error,
        });
      });
    }
  }
}
