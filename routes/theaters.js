import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();

/**
 * @openapi
 * /api/theaters/:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Theater APIs
 */
router.get("/", passport.authenticate("jwt", { session: false }), controllers.theaters.getAllTheaters);

/**
 * @openapi
 * /api/theaters/addtheater/:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Theater APIs
 */
router.post("/addtheater", passport.authenticate("jwt", { session: false }), controllers.theaters.addTheater);
export default router;  