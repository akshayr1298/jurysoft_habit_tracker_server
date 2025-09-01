import {
  addHabit,
  getAllHabits,
  markDone,
  resetHabit,
} from "../controller/habitContoller";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* POST request */
router.post("/", addHabit);

/*PATCH request */
router.patch("/:id", markDone);
router.patch("/reset/:id", resetHabit);

/* GET request */
router.get("/", getAllHabits);

/**
 * @export {express.Router}
 */
export default router;
