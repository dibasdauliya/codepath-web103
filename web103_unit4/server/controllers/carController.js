import { pool } from "../config/database.js";
import carModel from "../models/carModel.js";

const getCars = async (req, res) => {
  try {
    const cars = await carModel.getCarsQuery();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCarById = async (req, res) => {
  const { car_id } = req.params;
  try {
    const car = await carModel.getCarByIdQuery(parseInt(car_id));

    if (!car) {
      res.status(404).json({ error: `Car with id: ${car_id} not found` });
    }

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCar = async (req, res) => {
  try {
    const carObj = req.body;
    const car = await carModel.createNewCarQuery(carObj);
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    const carObj = req.body;
    const car = await carModel.updateCarQuery(parseInt(car_id), carObj);

    if (!car) {
      res.status(404).json({ error: `Car with id: ${car_id} not found` });
    }

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { car_id } = req.params;
    const car = await carModel.deleteCarQuery(parseInt(car_id));

    if (!car) {
      res.status(404).json({ error: `Car with id: ${car_id} not found` });
    }

    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default { getCars, getCarById, createCar, updateCar, deleteCar };
