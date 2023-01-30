
import services from "../services/index.js";

const getAllTheaters = async (req, res) => {

    try {
        const theaters = await services.theaters.everyTheater(req);
        return res.json(theaters);
    }
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};  
const addTheater = async (req, res) => {

    try {
        const response = await services.theaters.addTheater(req);
        return res.send(response);
    }
    
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};
export default {
    getAllTheaters,
    addTheater
}