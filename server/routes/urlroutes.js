import express from "express"
import { createShortUrl, getUrlStats, getUserUrls, redirectToOriginal } from "../controller/urlController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/generate-url", protect, createShortUrl);
router.get("/user-url", protect, getUserUrls)
router.get("/:code", redirectToOriginal)

// Create this beacuse it was written in instruction but i'm not use it.
router.post('/stats/:code', protect, getUrlStats);


export default router;