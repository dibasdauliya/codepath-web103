import { pool } from "../config/database.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM events");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const { title, description, event_date, location_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO events (title, description, event_date, location_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, event_date, location_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
};
``;
