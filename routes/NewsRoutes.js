import { Router } from "express";
import NewsController from "../controllers/NewsController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router=new Router()
router.get("/all",NewsController.getNews)
router.post("/",AuthMiddleware,NewsController.createNews)
router.get("/:id",NewsController.show)
router.put("/:id",NewsController.update)
router.delete("/:id",NewsController.destroy)
export default router