var CategoryGraphQL = require("./category/category.graphql");
var BookGraphQL = require("./books/book.graphql");
const { ApolloServer } = require("apollo-server");

const query = `
  type Query {
    ${CategoryGraphQL.queries}
    ${BookGraphQL.queries}
  }
`;

const server = new ApolloServer({
  typeDefs: [CategoryGraphQL.types, BookGraphQL.types, query],
  resolvers: [CategoryGraphQL.resolvers, BookGraphQL.resolvers],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
