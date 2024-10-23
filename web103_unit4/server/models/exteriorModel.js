import { pool } from "../config/database.js";

const getExteriorsQuery = async () => {
  try {
    const getExteriorsQuery = `SELECT * FROM exteriors`;
    const results = await pool.query(getExteriorsQuery);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve cars");
  }
};

const getExteriorByIdQuery = async (id) => {
  try {
    const getExteriorByIdQuery = "SELECT * FROM exteriors WHERE id = $1";
    const results = await pool.query(getExteriorByIdQuery, [parseInt(id)]);
    return results.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to retrieve interior with id: ${id}`);
  }
};

export default { getExteriorsQuery, getExteriorByIdQuery };
