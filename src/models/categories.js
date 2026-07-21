import db from './db.js';

const getAllCategories = async () => {
  const result = await db.query("SELECT * FROM categories ORDER BY name");
  return result.rows;
};
const getCategoryById = async (id) => {
  const query = `
    SELECT
      category_id,
      name
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);

  return result.rows[0];
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.location,
      p.date,
      p.organization_id
    FROM projects p
    JOIN project_categories pc
      ON p.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY p.date;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows;
};

export {
  getAllCategories,
  getCategoryById,
  getCategoriesByProjectId,
  getProjectsByCategoryId
};
