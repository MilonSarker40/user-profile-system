import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", authenticate, authorizeAdmin, createUser);
router.get("/", authenticate, authorizeAdmin, getUsers);
router.get("/:id", authenticate, getUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, authorizeAdmin, deleteUser);

export default router;
