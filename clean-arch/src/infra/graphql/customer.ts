import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { ListCustomerUseCase } from "../../usecases/customer/list/list.customer.usecase";
import CustomerRepository from "../customer/repository/customer.repository";


export const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: {
    id: { type: GraphQLString, description: "id" },
    name: { type: GraphQLString },
  },
});

export const queries = {
  customers: {
    type: new GraphQLList(CustomerType),
    resolve: async () => {
      const list = new ListCustomerUseCase(new CustomerRepository());
      const result = await list.execute({});
      return result.customers;
    },
  },
};