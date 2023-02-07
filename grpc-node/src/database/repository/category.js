const crypto = require('crypto');
const { db } = require('../connection');

const createCategory = ({ name, description }) => {
  const id = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO category values(?,?,?)`);
    stmt.run([id,name, description], (result, err) => {
      if (err) {
        return reject(err);
      }
      resolve({ result, id });
    })
  })
}


module.exports = {
  createCategory
}