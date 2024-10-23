import interiorModel from "../models/interiorModel.js";

const getInteriors = async (req, res) => {
  try {
    const cars = await interiorModel.getInteriorsQuery();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getInteriorById = async (req, res) => {
  const { interior_id } = req.params;
  try {
    const interior = await interiorModel.getInteriorByIdQuery(
      parseInt(interior_id)
    );

    if (!interior) {
      res
        .status(404)
        .json({ error: `Interior with id: ${interior_id} not found` });
    }

    res.status(200).json(interior);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getInteriors, getInteriorById };
