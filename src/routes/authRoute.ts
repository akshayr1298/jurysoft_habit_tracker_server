import { validateData } from "../middleware/validationMiddleware";
import { userRegisteration } from "../controller/authController";
import { Router } from "express";
import { userSignupSchema } from "../utils/validation/schema";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* POST request */

router.post("/signup", validateData(userSignupSchema), userRegisteration); // registeration api

/**
 * @export {express.Router}
 */
export default router;
