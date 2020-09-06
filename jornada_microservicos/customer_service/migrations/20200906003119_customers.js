exports.up = function (knex) {
  return knex.schema.createTable("customers", function (table) {
    table.string("id");
    table.string("name", 1000).notNullable();
    table.date("birth").notNullable();
    table.integer("level").notNullable().default(1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
