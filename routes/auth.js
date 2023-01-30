import { Router } from "express";
import controllers from "../controllers/index.js";
const router = Router();

/**
 * @openapi
 * /api/auth/:
 *   get:
 *     summary: Home Screen For Auth Route
 *     description: Just a normal landing page.
 *     responses:
 *       200:
 *         description: All good.
 *     tags: 
 *       - Auth APIs
 */
router.get('/', (req, res) => {
    res.send("Welcome to auth API! Use login and signup routes.")
});


/**
 * @openapi
 * /api/auth/signup/:
 *   post:
 *     summary: Signup for both customer and admin
 *     description: Both customer and admin will use this common signup page, defining thier respective roles.
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *     tags: 
 *       - Auth APIs
 */
router.post('/signup', controllers.auth.userSignUp);

/**
 * @openapi
 * /api/auth/login/:
 *   post:
 *     summary: Login both customer and admin
 *     description: Both customer and admin will login from here. System will automatically pick thier role from user database.
 *     requestBody:
 *          description: This is the request body required for login.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - email
 *                  - password
 *                properties:
 *                  email:
 *                    description: email of the user used at signup.
 *                    type: string
 *                  password:
 *                    description: password set by user while signup
 *                    type: string
 *     responses:
 *       406:
 *         description: Not a valid email or wrong password.
 *       404:
 *         description: User doesn't exist.
 *       
 *     tags: 
 *       - Auth APIs
 */
router.post('/login', controllers.auth.userLogin);

export default router;