import { validateData } from "../middleware/validationMiddleware";
import { userLogin, userRegisteration } from "../controller/authController";
import { Router } from "express";
import { userLoginSchema, userSignupSchema } from "../utils/validation/schema";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* POST request */

router.post("/signup", validateData(userSignupSchema), userRegisteration); // registeration api
router.post("/login", validateData(userLoginSchema), userLogin); // login api

/**
 * @export {express.Router}
 */
export default router;
