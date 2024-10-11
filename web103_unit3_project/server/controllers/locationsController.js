import { pool } from "../config/database.js";

// Get all locations
export const getAllLocations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM locations");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ error: "Failed to fetch locations" });
  }
};

// Get location by ID
export const getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM locations WHERE id = $1", [
      id,
    ]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Location not found" });
    }
  } catch (err) {
    console.error("Error fetching location by ID:", err);
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

// Create a new location
export const createLocation = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO locations (name, description) VALUES ($1, $2) RETURNING *",
      [name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating location:", err);
    res.status(500).json({ error: "Failed to create location" });
  }
};
