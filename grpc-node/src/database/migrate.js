require('dotenv').config();
const { db } = require('./connection');
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, "../../", process.env.DB);

if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

db.serialize(() => {
  db.run("CREATE TABLE category (id TEXT, name TEXT, description TEXT)");
});

db.close();