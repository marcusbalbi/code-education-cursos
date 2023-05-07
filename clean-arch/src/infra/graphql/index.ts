import { graphqlHTTP } from "express-graphql";
import {
  GraphQLObjectType,
  GraphQLSchema,
} from "graphql";

import { CustomerType, queries as CustomerQueries } from "./customer";



const RootQueryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    ...CustomerQueries,
  },
});

const rootSchema = new GraphQLSchema({
  types: [CustomerType],
  query: RootQueryType,
});

export const graphqlStart = graphqlHTTP({
  schema: rootSchema,
  graphiql: true,
});
