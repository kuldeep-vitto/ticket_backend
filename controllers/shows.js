import services from "../services/index.js";
const getAllShows = async (req, res) => {

    try {
        const shows = await services.shows.findAllShows();
        if (shows.length === 0) {
            return res.json("There are no scheduled shows !!");
        }
        else {
            return res.status(200).json(shows);
        }
    }
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};
const addShow = async (req, res) => {  

    try {
        const { movie_name, theater_id, duration, start_time } = req.body;
        if (movie_name == null || theater_id == null || duration == null || start_time == null) { return res.status(406).send("Missing Fields!"); }
        if (duration <= 0 || duration >= 100000000) { return res.status(400).send("Invalid duration!!"); }
        const response = await services.shows.newShow(req);
        return res.status(200).send(response);  
    }
    
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};
const showByTheater = async (req, res) => {

    try {
        if (isNaN(req.params.id)) { return res.status(400).send("Not a valid theater id!!"); }
        const shows = await services.shows.filterTheater(req.params.id);
        return res.json(shows); 
    }
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};
const showByShow = async (req, res) => {

    try {
        const shows = await services.shows.filterShow(req.params.name);
        return res.json(shows);
    }
    catch (error) {
        if (error.statusCode === null) {
            return res.status(500).json({ message: error.message });
        }
        return res.status(error.statusCode).json({ message: error.message });
    }
};

export default {
    getAllShows,
    addShow,
    showByTheater,
    showByShow
}