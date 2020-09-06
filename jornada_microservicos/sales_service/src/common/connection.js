var databaseConfig = require("../../knexfile");

var knex = require("knex")(databaseConfig['development']);

module.exports = knex
