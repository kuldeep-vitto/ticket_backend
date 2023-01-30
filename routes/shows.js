import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();
/**
 * @openapi
 * /api/shows/:
 *   get:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Show APIs
 */
router.get("/", passport.authenticate("jwt", { session: false }), controllers.shows.getAllShows);


/**
 * @openapi
 * /api/shows/addshow/:
 *   post:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Show APIs
 */
router.post("/addshow", passport.authenticate("jwt", { session: false }), controllers.shows.addShow);

/**
 * @openapi
 * /api/shows/bytheater/:id/:
 *   get:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Show APIs
 */
router.get("/bytheater/:id", passport.authenticate("jwt", { session: false }), controllers.shows.showByTheater);

/**
 * @openapi
 * /api/shows/only/:name/:
 *   get:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Show APIs
 */
router.get("/only/:name", passport.authenticate("jwt", { session: false }), controllers.shows.showByShow);
export default router;
  