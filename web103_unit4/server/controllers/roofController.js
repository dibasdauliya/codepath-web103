import roofModel from "../models/roofModel.js";

const getRoofs = async (req, res) => {
  try {
    const cars = await roofModel.getRoofsQuery();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getRoofById = async (req, res) => {
  const { roof_id } = req.params;
  try {
    const roof = await roofModel.getRoofByIdQuery(parseInt(roof_id));

    if (!roof) {
      res.status(404).json({ error: `Roof with id: ${roof_id} not found` });
    }

    res.status(200).json(roof);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getRoofs, getRoofById };
