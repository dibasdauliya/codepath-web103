import { pool } from "../config/database.js";

const getGifts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM gifts ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getGiftsByID = async (req, res) => {
  const id = req.params.giftId;
  console.log({ id });

  try {
    const results = await pool.query("SELECT * FROM gifts WHERE id = $1", [id]);
    if (results.rows.length > 0) {
      res.status(200).json(results.rows[0]); // Return the first element as an object
    } else {
      res.status(404).json({ error: "Gift not found" });
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getGifts,
  getGiftsByID,
};
