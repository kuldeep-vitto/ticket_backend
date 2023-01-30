import { currUser } from "../repository/auth.js";
import { newUser } from "../repository/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const loginService = async (email,password) => {
    try {
        const user = await currUser(email);
        if (!user) {
            throw {statusCode: 404, message: "User not found!"};
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw {statusCode: 401, message: "Wrong Password!"};
        }
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.JWT_SECRET_KEY);
        return token;
    } catch (error) {
        throw error;
    }
}
const signupService = async (name, email, password, role) => {
    try {
        const user = await currUser(email);
        if (user) {
            throw { statusCode: 409, message: "User already exist, try different mail!" };
        }
        const nrole = role.toLowerCase();                                                                //handle role
        if (nrole !== 'admin' && nrole !== 'user') {  throw { statusCode: 406, message: "Invalid Role!" };}     //validate role
        const npass = await bcrypt.hash(password, 5);
        return await newUser(name, email, npass, nrole);
        
    } catch (error) {
        throw error;
    }
}
export default {
    loginService,
    signupService
}