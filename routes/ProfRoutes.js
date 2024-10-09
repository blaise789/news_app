import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import ProfileController from "../controllers/ProfileController.js";

const router=Router()
router.get("/",authMiddleware,ProfileController.getProfile);
router.put("/",authMiddleware,ProfileController.update)
export default router;