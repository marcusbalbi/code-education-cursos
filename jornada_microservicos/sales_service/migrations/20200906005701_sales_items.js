exports.up = function (knex) {
  return knex.schema.createTable("sales_items", function (table) {
    table.string("id").notNullable();
    table.string("sales_id").notNullable();
    table.string("product_id").notNullable();
    table.decimal("price").notNullable();
    table.integer("amaunt").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sales_items");
};
