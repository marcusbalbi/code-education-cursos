exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.string("id");
    table.decimal("price").notNullable();
    table.string("name", 1000).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
