exports.up = function (knex) {
  return knex.schema.createTable("clients", function (table) {
    table.string("id");
    table.string("name", 1000).notNullable();
    table.integer("level").notNullable().default(1);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
