import { profile } from "../controller/userController";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* GET request */

/**
 * @openapi
 * /profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user profile
 *     description: Returns profile of the authenticated user.  
 *                  Requires both Bearer token and Refresh token in headers.
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: Successfully fetched profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       401:
 *         description: Unauthorized - Missing or invalid tokens
 */

router.get("/", profile);
/**
 * @export {express.Router}
 */
export default router;
