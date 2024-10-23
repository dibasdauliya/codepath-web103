import { pool } from "../config/database.js";

const getWheelsQuery = async () => {
  try {
    const getWheelsQuery = `SELECT * FROM wheels`;
    const results = await pool.query(getWheelsQuery);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve cars");
  }
};

const getWheelsByIdQuery = async (id) => {
  try {
    const getWheelsByIdQuery = "SELECT * FROM wheels WHERE id = $1";
    const results = await pool.query(getWheelsByIdQuery, [parseInt(id)]);
    return results.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to retrieve wheels with id: ${id}`);
  }
};

export default { getWheelsQuery, getWheelsByIdQuery };
