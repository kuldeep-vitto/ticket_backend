import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();
/**
 * @openapi
 * /api/shows/:
 *   get:
 *     summary: Get all shows.
 *     description: List of all shows avaialable.
 *     security:
 *       - userToken: []
 *     responses:
 *       200:
 *         description: All shows.
 *       206:
 *         description: There are no scheduled shows !!
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Show APIs
 */
router.get("/", passport.authenticate(["user","admin"], { session: false }), controllers.shows.getAllShows);


/**
 * @openapi
 * /api/shows/addshow/:
 *   post:
 *     summary: Add new show.
 *     description: this route is for adding a new show.
 *     security:
 *       - userToken: []
 *     requestBody:
 *          description: This is the request body required for adding a new show.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - movie_name
 *                  - theater_id
 *                  - duration
 *                  - start_time
 *                properties:
 *                  movie_name:
 *                    description: name of the movie.
 *                    type: string
 *                  theater_id:
 *                    description: theater where to play movie
 *                    type: number
 *                  duration:
 *                    description: duration of the movie.
 *                    type: number
 *                  theater_name:
 *                    description: start_time
 *                    type: string
 *     responses:
 *       200:
 *         description: Show successfully created.
 *       401:
 *         description: Unauthorised access.
 *       406:
 *         description: Not valid duration or some field is missing.
 *       405:
 *         description: Add theater first.
 *       500:
 *         description: Internal server error.
 *       501:
 *         description: Time slot is overlapping with an existing show. Please either change duration or start_time.
 *     tags: 
 *       - Show APIs
 */
router.post("/addshow", passport.authenticate(["admin"], { session: false }), controllers.shows.addShow);

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
router.get("/bytheater/:id", passport.authenticate(["user","admin"], { session: false }), controllers.shows.showByTheater);

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
router.get("/only/:name", passport.authenticate(["user","admin"], { session: false }), controllers.shows.showByShow);
export default router;
  