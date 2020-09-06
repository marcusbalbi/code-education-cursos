exports.up = function (knex) {
  return knex.schema.createTable("sales", function (table) {
    table.string("id").notNullable();
    table.string("client_id").notNullable();
    table.decimal("total").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sales");
};
