import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import * as yup from "yup";
import Product from "../entity/Product";
export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required("ID is required"),
          name: yup.string().required("Name is required"),
          price: yup
            .number()
            .required("Price is required")
            .positive("Price should be a positive number"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
          },
          {
            abortEarly: false,
          }
        );
    } catch (e) {
      const { errors } = e as yup.ValidationError;
      errors.forEach((error) => {
        entity.notification.addError({
          context: "product",
          message: error,
        });
      });
    }
  }
}
