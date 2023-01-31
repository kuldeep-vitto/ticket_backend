import { Router } from "express";
import controllers from "../controllers/index.js";
import passport from "../config/passport.js";
const router = Router();

/**
 * @openapi
 * /api/tickets/:
 *   get:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Ticket APIs
 */
router.get("/", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.getByUser);

/**
 * @openapi
 * /api/tickets/book/:
 *   post:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Ticket APIs
 */
router.post("/book", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.bookTicket);

/**
 * @openapi
 * /api/tickets/cancel/:id/:
 *   delete:
 *     description: Wedoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Ticket APIs
 */
router.delete("/cancel/:id", passport.authenticate(["user","admin"], { session: false }), controllers.tickets.cancelTicket);


export default router; 