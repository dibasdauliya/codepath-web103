import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
} from "../controllers/eventsController.js";

const router = express.Router();

// Route to get all events
router.get("/events", getAllEvents);

// Route to get an event by ID
router.get("/events/:id", getEventById);

// Route to create a new event
router.post("/events", createEvent);

export default router;
