import { Router } from "express";
import ProfileController from "../controllers/ProfileController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router=Router()
router.get("/",AuthMiddleware,ProfileController.getProfile);
router.put("/",AuthMiddleware,ProfileController.update)
export default router;