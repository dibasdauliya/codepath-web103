import { pool } from "../config/database.js";

const getCarsQuery = async () => {
  try {
    const getCarsQuery = `SELECT * FROM cars`;
    const results = await pool.query(getCarsQuery);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve cars");
  }
};

const getCarByIdQuery = async (id) => {
  try {
    const getCarById = `SELECT * FROM cars WHERE id = $1`;
    const results = await pool.query(getCarById, [parseInt(id)]);

    return results.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to retrieve the car with id: ${id}`);
  }
};

const createNewCarQuery = async (car) => {
  const { name, isconvertible, exterior, roof, wheels, interior, price } = car;
  try {
    const createNewCarQuery =
      "INSERT INTO cars(name, isconvertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      name,
      isconvertible,
      exterior,
      roof,
      wheels,
      interior,
      price,
    ];
    const results = await pool.query(createNewCarQuery, values);
    return results.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create a new car");
  }
};

const updateCarQuery = async (id, car) => {
  try {
    const { name, isconvertible, exterior, roof, wheels, interior, price } =
      car;
    const updateCarQuery =
      "Update cars SET name = $1, isconvertible = $2, exterior = $3, roof = $4, wheels = $5, interior = $6, price= $7 WHERE id = $8";
    const values = [
      name,
      isconvertible,
      exterior,
      roof,
      wheels,
      interior,
      price,
      parseInt(id),
    ];
    const results = await pool.query(updateCarQuery, values);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to update the car with id: ${id}`);
  }
};

const deleteCarQuery = async (id) => {
  try {
    const deleteCarQuery = "DELETE FROM cars WHERE id = $1";
    const values = [parseInt(id)];
    const results = await pool.query(deleteCarQuery, values);
    return results.rows;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to delete the car with id: ${id}`);
  }
};

export default {
  getCarsQuery,
  getCarByIdQuery,
  createNewCarQuery,
  updateCarQuery,
  deleteCarQuery,
};
