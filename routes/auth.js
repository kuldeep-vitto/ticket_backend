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
 *     requestBody:
 *          description: This is the request body required for login.
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                required:
 *                  - name
 *                  - email
 *                  - password
 *                  - role
 *                properties:
 *                  name: 
 *                    description: Full name of user.
 *                    type: string
 *                    example: Vivek Yadav
 *                  email:
 *                    description: email of the user 
 *                    type: string
 *                    example: vivek@badaadmi.com
 *                  password:
 *                    description: password of user
 *                    type: string
 *                    example: AHGhfhkf@12
 *                  role:
 *                    description: Admin or user.
 *                    type: string
 *                    example: user
 *     responses:
 *       201:
 *         description: Signup successfull.
 *       406:
 *         description: Not a valid email or password.
 *       409:
 *         description: User already exist , try a diferent mail.
 *       500:
 *         description: Internal server error.
 *       
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
 *                    example: vivek@badaadmi.com
 *                  password:
 *                    description: password set by user while signup
 *                    type: string
 *                    example: AHGhfhkf@12
 *     responses:
 *       200:
 *         description: Token returned successfully.
 *       406:
 *         description: Not a valid email or missing fields.
 *       404:
 *         description: User doesn't exist.
 *       401:
 *         description: Wrong Password.
 *       500:
 *         description: Internal server error.
 *       
 *     tags: 
 *       - Auth APIs
 */
router.post('/login', controllers.auth.userLogin);

export default router;