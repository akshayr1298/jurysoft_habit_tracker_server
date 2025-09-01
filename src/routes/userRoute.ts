import { profile } from "../controller/userController";
import { Router } from "express";

/**
 * @constant {express.Router}
 */
const router: Router = Router();

/* GET request */

router.get("/", profile);
/**
 * @export {express.Router}
 */
export default router;
