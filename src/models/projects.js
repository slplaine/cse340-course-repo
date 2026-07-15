import db from './db.js';

export const getAllProjects = async () => {
  const query = `
    SELECT p.project_id, p.title, p.date, o.name AS organization_name
    FROM projects p
    JOIN organization o ON p.organization_id = o.organization_id
    ORDER BY p.date;
  `;
  const result = await db.query(query);
  return result.rows;
};
