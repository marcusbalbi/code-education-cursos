import crypto from 'crypto'
const { db } = require('../connection');

interface Category {
  name: string;
  description: string;
}

interface SavedCategory extends Category {
  id: string;
}

export const createCategory = (category: Category): Promise<SavedCategory> => {
  const id = crypto.randomUUID();
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`INSERT INTO category values(?,?,?)`);
    stmt.run(
      [id, category.name, category.description],
      (result: any, err: Error) => {
        if (err) {
          return reject(err);
        }
        resolve({ ...category, id });
      }
    );
  });
};

export const updateCategory = (id: string, category: Category): Promise<SavedCategory> => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`UPDATE category SET name = ?, description = ? WHERE id = ?`);
    stmt.run(
      [category.name, category.description, id],
      (result: any, err: Error) => {
        if (err) {
          return reject(err);
        }
        resolve({ ...category, id });
      }
    );
  });
};

export default {
  createCategory,
  updateCategory
}