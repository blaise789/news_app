import { Router } from "express";
import NewsController from "../controllers/NewsController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router=new Router()
router.get("/all",NewsController.getNews)
router.post("/",AuthMiddleware,NewsController.createNews)
router.get("/:id",NewsController.show)
router.put("/:id",AuthMiddleware,NewsController.update)
router.delete("/:id",AuthMiddleware,NewsController.destroy)
export default router