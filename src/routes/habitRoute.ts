import { validateData } from "../middleware/validationMiddleware";
import {
  addHabit,
  getAllHabits,
  markDone,
  resetHabit,
} from "../controller/habitContoller";
import { Router } from "express";
import { createHabitsSchema } from "../utils/validation/schema";

/**
 * @constant {express.Router}
 */
const router: Router = Router();
/**
 * @openapi
 * /habits:
 *   post:
 *     tags:
 *       - Habits
 *     summary: Create user habit
 *     description: Creates a new habit for the user.  
 *                  Requires both Bearer token and Refresh token in headers.
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Habits'
 *     responses:
 *       201:
 *         description: Habit created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Habits'
 *       401:
 *         description: Unauthorized - Missing or invalid tokens
 *       409:
 *         description: This habit already exists for the user
 */
router.post("/", validateData(createHabitsSchema), addHabit);

/**
 * @openapi
 * /habits/{id}:
 *   patch:
 *     tags:
 *       - Habits
 *     summary: Mark habit as done
 *     description: Mark a habit as completed for the given ID.  
 *                  Requires Bearer token and Refresh token.
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Habit ID
 *     responses:
 *       200:
 *         description: Habit marked as done
 *       404:
 *         description: Habit not found
 */
router.patch("/:id", markDone);

/**
 * @openapi
 * /habits/reset/{id}:
 *   patch:
 *     tags:
 *       - Habits
 *     summary: Reset habit
 *     description: Reset the status of a habit by ID.  
 *                  Requires Bearer token and Refresh token.
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Habit ID
 *     responses:
 *       200:
 *         description: Habit reset successfully
 *       404:
 *         description: Habit not found
 */
router.patch("/reset/:id", resetHabit);

/**
 * @openapi
 * /habits:
 *   get:
 *     tags:
 *       - Habits
 *     summary: Get all habits
 *     description: Retrieve all habits for the logged-in user.  
 *                  Requires Bearer token and Refresh token.
 *     security:
 *       - bearerAuth: []
 *       - refreshToken: []
 *     responses:
 *       200:
 *         description: List of habits
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Habits'
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAllHabits);


/**
 * @export {express.Router}
 */
export default router;
