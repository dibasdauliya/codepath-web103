import express from "express";
import interiorController from "../controllers/interiorController.js";

const router = express.Router();

router.route("/").get(interiorController.getInteriors);
router.route("/:interior_id").get(interiorController.getInteriorById);

export default router;
