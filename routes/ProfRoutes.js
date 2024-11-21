import { Router } from "express";
import ProfileController from "../controllers/ProfileController.js";
import AuthMiddleware from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the authenticated user's profile details. Requires authentication.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized access.
 */
router.get("/", AuthMiddleware, ProfileController.getProfile);

/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update user profile
 *     description: Update the authenticated user's profile details. Requires authentication.
 *     tags:
 *       - Profile
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfileInput'
 *     responses:
 *       200:
 *         description: User profile updated successfully.
 *       401:
 *         description: Unauthorized access.
 *       400:
 *         description: Bad request. Invalid input data.
 */
router.put("/", AuthMiddleware, ProfileController.update);

export default router;
