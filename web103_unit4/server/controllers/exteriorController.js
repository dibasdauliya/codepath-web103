import exteriorModel from "../models/exteriorModel.js";

const getExteriors = async (req, res) => {
  try {
    const cars = await exteriorModel.getExteriorsQuery();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getExteriorById = async (req, res) => {
  const { exterior_id } = req.params;
  try {
    const exterior = await exteriorModel.getExteriorByIdQuery(
      parseInt(exterior_id)
    );

    if (!exterior) {
      return res
        .status(404)
        .json({ error: `Exterior with id: ${exterior_id} not found` });
    }

    res.status(200).json(exterior);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getExteriors, getExteriorById };
