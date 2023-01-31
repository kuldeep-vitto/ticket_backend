import { allTheaters, newTheater } from "../repository/theaters.js";

const everyTheater = async (req) => {
    try {
        if (req.user.role!=="admin") {
            throw { statusCode: 401, message: "Unauthorised Access!!" };
        }
        const theaters = await allTheaters(req.user.id);
        
        if(theaters.length === 0 ){ throw { statusCode: 206, message: "No theaters exist for this user!!" };}
        return theaters;
    } catch (error) {
        throw error;
    }
}
const addTheater = async (req) => {
    try {
        if (req.user.role!=="admin") {
            throw { statusCode: 401, message: "Unauthorised Access!!" };
        }
        
        const { theater_name, capacity } = req.body;
        if (capacity <= 0 || capacity >= 100000000) { throw { statusCode: 405, message: "Invalid Seat Capacity!!" }; }
        return await newTheater(req.user.id, theater_name, capacity);
    } catch (error) {
        throw error;
    }
}
export default {
    everyTheater,
    addTheater
}