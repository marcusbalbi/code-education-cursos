const store = require("./categories.store.json");
var types = `
  type Category {
    id: String
    name: String
    books: [Book]
  }
`;

const queries = `
  categories: [Category]
`;

const resolvers = {
  Query: {
    categories: () => {
      return store;
    },
  },
  Category: {
    books: (category) => {
      const storeBooks = require("../books/books.store.json");
      return storeBooks.filter((book) => {
        return book.categories.includes(category.id);
      });
    },
  },
};

module.exports = {
  types,
  resolvers,
  queries,
};
