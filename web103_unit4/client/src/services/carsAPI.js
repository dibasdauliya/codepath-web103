import { request } from "../utilities/api";

const URL = "http://localhost:3000/api/cars";

const getAllCars = () => request(URL);

const getCarById = (id) => request(`${URL}/${id}`);

const createCar = (car) => request(URL, "POST", car);

const updateCar = (id, car) => request(`${URL}/${id}`, "PATCH", car);

const deleteCar = (id) => request(`${URL}/${id}`, "DELETE");

export default { getAllCars, getCarById, createCar, updateCar, deleteCar };
