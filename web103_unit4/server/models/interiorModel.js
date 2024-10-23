import { pool } from "../config/database.js";

const getInteriorsQuery = async () => {
  try {
    const getInteriorsQuery = `SELECT * FROM interiors`;
    const results = await pool.query(getInteriorsQuery);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve cars");
  }
};

const getInteriorByIdQuery = async (id) => {
  try {
    const getInteriorByIdQuery = "SELECT * FROM interiors WHERE id = $1";
    const results = await pool.query(getInteriorByIdQuery, [parseInt(id)]);
    return results.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to retrieve exterior with id: ${id}`);
  }
};

export default { getInteriorsQuery, getInteriorByIdQuery };
