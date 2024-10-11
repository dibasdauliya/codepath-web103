import express from "express";
import {
  getAllLocations,
  getLocationById,
  createLocation,
} from "../controllers/locationsController.js";

const router = express.Router();

// Route to get all locations
router.get("/locations", getAllLocations);

// Route to get a location by ID
router.get("/locations/:id", getLocationById);

// Route to create a new location
router.post("/locations", createLocation);

export default router;
