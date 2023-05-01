import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecases/customer/list/list.customer.dto";

export class CustomerPresenter {
  static toXml(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      ident: " ",
      newLine: "\n",
      allowEmpty: true,
    };
    return toXML(
      {
        customers: {
          customer: data.customers.map((c) => ({
            id: c.id,
            name: c.name,
            address: {
              street: c.address.street,
              number: c.address.number,
              city: c.address.city,
              zipcode: c.address.zip,
            },
          })),
        },
      },
      xmlOptions
    );
  }
}
