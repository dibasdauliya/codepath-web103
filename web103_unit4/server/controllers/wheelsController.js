import wheelsModel from "../models/wheelsModel.js";

const getWheels = async (req, res) => {
  try {
    const cars = await wheelsModel.getWheelsQuery();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getWheelsById = async (req, res) => {
  const { wheels_id } = req.params;
  try {
    const wheels = await wheelsModel.getWheelsByIdQuery(parseInt(wheels_id));

    if (!wheels) {
      res.status(404).json({ error: `Wheels with id: ${wheels_id} not found` });
    }

    res.status(200).json(wheels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getWheels, getWheelsById };
