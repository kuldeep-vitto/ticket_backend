
import services from "../services/index.js";

const getAllTheaters = async (req, res) => {

    try {
        const theaters = await services.theaters.everyTheater(req);
        return res.json(theaters);
    }
    catch (error) {
        console.log(error);
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
};  
const addTheater = async (req, res) => {

    try {
        const { theater_name, capacity } = req.body;
        if (theater_name == null || capacity == null) { return res.status(406).send("Missing Fields!"); }
        const response = await services.theaters.addTheater(req);
        return res.send(response);
    }
    
    catch (error) {
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
};
export default {
    getAllTheaters,
    addTheater
}