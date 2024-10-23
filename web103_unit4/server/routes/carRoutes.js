import express from "express";
import carController from "../controllers/carController.js";

const router = express.Router();

router.route("/").get(carController.getCars).post(carController.createCar);
router
  .route("/:car_id")
  .get(carController.getCarById)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

export default router;
