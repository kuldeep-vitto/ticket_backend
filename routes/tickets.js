import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();

/**
 * @openapi
 * /api/tickets/:
 *   get:
 *     summary: Get all tickets by logged in user. 
 *     description: List of all tickets booked by this user.
 *     security:
 *       - userToken: []
 *     responses:
 *       200:
 *         description: All tickets.
 *       405:
 *         description: No booked tickets!!
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Ticket APIs
 */
router.get("/", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.getByUser);

/**
 * @openapi
 * /api/tickets/book/:
 *   post:
 *     summary: Book new ticket.
 *     description: This route is for booking a new ticket by logged in user.
 *     security:
 *       - userToken: []
 *     requestBody:
 *          description: This is the request body required for booking a new ticket.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - show_id
 *                  - booked_seats
 *                properties:
 *                  show_id:
 *                    description: show id for which booking seats.
 *                    type: number
 *                    example: 1
 *                  booked_seats:
 *                    description: number of seats want to book.
 *                    type: number
 *                    example: 3
 *     responses:
 *       200:
 *         description: Ticket booked successfully..
 *       405:
 *         description: These many seats are not available.
 *       406:
 *         description: Not valid number of seats or some field is missing.
 *       404:
 *         description: This show doesn't exist.
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Ticket APIs
 */
router.post("/book", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.bookTicket);

/**
 * @openapi
 * /api/tickets/cancel/:id/:
 *   delete:
 *     summary: Cancel ticket.
 *     description: Cancel ticked by id,must have been booked bby logged in user.
 *     security:
 *       - userToken: []
 *     parameters:
 *     - in: path
 *       name: id
 *       type: number
 *       required: true
 *       example: 1
 *       description: This parameter is used for getting the ticket ID for a particular ticket cancellation.
 *     responses:
 *       400:
 *         description: Not a valid ticket or no such ticket exist.
 *       200:
 *         description: Get all shows at this theater.
 *       401:
 *         description: Unauthorised cancellation.
 *       500:
 *         description: Internal server error.
 *     tags: 
 *       - Ticket APIs
 */
router.delete("/cancel/:id", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.cancelTicket);


export default router; 