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
 *                    example: Bahubali
 *                  theater_id:
 *                    description: theater where to play movie
 *                    type: number
 *                    example: 1
 *                  duration:
 *                    description: duration of the movie in minutes
 *                    type: number
 *                    example: 140
 *                  start_time:
 *                    description: start_time in HH:MM
 *                    type: string
 *                    example: 15:00
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
 *     summary: Get all shows filtered by theater id.
 *     description: List of shows avaialable at given theater.
 *     security:
 *       - userToken: []
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *       example: 1
 *       description: This parameter is used for getting shows at this particular theater.
 *     responses:
 *       400:
 *         description: Not a valid theater ID.
 *       200:
 *         description: Get all shows at this theater.
 *       204:
 *         description: No show at this theater!!
 *       405:
 *         description: This theater doesn't exist!!!
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Show APIs
 */
router.get("/bytheater/:id", passport.authenticate(["user","admin"], { session: false }), controllers.shows.showByTheater);

/**
 * @openapi
 * /api/shows/only/:name/:
 *   get:
 *     summary: Get all shows with this movie name.
 *     description: List of all shows playing this movie..
 *     security:
 *       - userToken: []
 *     parameters:
 *     - in: path
 *       name: name
 *       type: string
 *       required: true
 *       example: bahubali
 *       description: This parameter is used for getting shows play this movie.
 *     responses:
 *       200:
 *         description: Get all shows for this movie.
 *       204:
 *         description: No show for this movie!!
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Show APIs
 */
router.get("/only/:name", passport.authenticate(["user","admin"], { session: false }), controllers.shows.showByShow);
export default router;
  