import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();

/**
 * @openapi
 * /api/theaters/:
 *   get:
 *     summary: Get all theaters for logged in admin.
 *     description: Details of all theaters created by logged in admin.
 *     security:
 *       - userToken: []
 *     responses:
 *       200:
 *         description: List of all theaters created by this user.
 *       401:
 *         description: Unauthorised access.
 *       206:
 *         description: No theaters exist for this user!!
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Theater APIs
 */
router.get("/", passport.authenticate(["admin"], { session: false }), controllers.theaters.getAllTheaters);

/**
 * @openapi
 * /api/theaters/addtheater/:
 *   post:
 *     summary: Add new theater.
 *     description: this route is for adding a new theater.
 *     security:
 *       - userToken: []
 *     requestBody:
 *          description: This is the request body required for adding a theater.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - theater_name
 *                  - capacity
 *                properties:
 *                  theater_name:
 *                    description: name of the theater.
 *                    type: string
 *                  capacity:
 *                    description: password set by user while signup
 *                    type: number
 *     responses:
 *       200:
 *         description: List of all theaters created by this user.
 *       401:
 *         description: Unauthorised access.
 *       406:
 *         description: Missing Fields!!
 *       405:
 *         description: Invalid seat capacity.
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Theater APIs
 */
router.post("/addtheater", passport.authenticate(["admin"], { session: false }), controllers.theaters.addTheater);
export default router;  