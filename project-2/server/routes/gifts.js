import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import GiftsController from "../controllers/gifts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", GiftsController.getGifts);

router.get("/:giftId", GiftsController.getGiftsByID);

export default router;
