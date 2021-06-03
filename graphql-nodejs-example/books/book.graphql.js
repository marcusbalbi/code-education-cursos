const store = require("./books.store.json");
const storeCategories = require("../category/categories.store.json");
var types = `
  type Book {
    id: String
    name: String,
    categories: [Category]
  }
`;

const queries = `
  books: [Book]
`;

const resolvers = {
  Query: {
    books: () => {
      return store;
    },
  },
  Book: {
    categories: (book) => {
      return book.categories.map((categoryId) =>
        storeCategories.find((category) => category.id === categoryId)
      );
    },
  },
};

module.exports = {
  types,
  resolvers,
  queries,
};
