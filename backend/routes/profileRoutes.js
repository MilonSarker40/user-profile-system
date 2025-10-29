import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";
import { createProfile, getProfile, updateProfile, deleteProfile,getAllProfiles } from "../controllers/profileController.js";

const router = express.Router();

router.post("/", authenticate, createProfile);
router.get("/", authenticate, getAllProfiles);
router.get("/:userId", getProfile);
router.put("/:userId", authenticate, updateProfile);
router.delete("/:userId", authenticate, deleteProfile);

export default router;
