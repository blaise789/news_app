import { Router } from "express";
import NewsController from "../controllers/NewsController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = new Router();

/**
 * @swagger
 * /news/all:
 *   get:
 *     summary: Get all news articles
 *     description: Retrieve a list of all news articles available in the system.
 *     tags:
 *       - News
 *     responses:
 *       200:
 *         description: List of news articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.get("/all", NewsController.getNews);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a news article
 *     description: Create a new news article. Requires authentication.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsInput'
 *     responses:
 *       201:
 *         description: News article created successfully.
 *       401:
 *         description: Unauthorized access.
 */
router.post("/", AuthMiddleware, NewsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a specific news article
 *     description: Retrieve details of a specific news article by its ID.
 *     tags:
 *       - News
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news article to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News article details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: News article not found.
 */
router.get("/:id", NewsController.show);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news article
 *     description: Update the details of a specific news article by its ID. Requires authentication.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news article to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsInput'
 *     responses:
 *       200:
 *         description: News article updated successfully.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: News article not found.
 */
router.put("/:id", AuthMiddleware, NewsController.update);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     description: Delete a specific news article by its ID. Requires authentication.
 *     tags:
 *       - News
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news article to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: News article deleted successfully.
 *       401:
 *         description: Unauthorized access.
 *       404:
 *         description: News article not found.
 */
router.delete("/:id", AuthMiddleware, NewsController.destroy);

export default router;
