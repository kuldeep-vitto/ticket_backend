import services from "../services/index.js"; 

const bookTicket = async (req, res) => {

    try {
        const { show_id, booked_seats } = req.body;
        if (show_id == null || booked_seats == null) { throw { statusCode: 406, message: "Missing Fields!!" }; }
        if (booked_seats <= 0 || booked_seats >= 100000000) { throw { statusCode: 406, message: "Please add valid seats!!" }; }
        const response = await services.tickets.newTicket(req);
        return res.send(response);
    }
    
    catch (error) {
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
};
const getByUser = async (req, res) => {

    try { 

        const tickets = await services.tickets.userTickets(req.user.id);
        res.status(200).json(tickets);
    }
    catch (error) {
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
};
const cancelTicket = async (req, res) => {
 
    try {
        if (isNaN(req.params.id)) { throw { statusCode: 400, message: "Not a valid ticket!!" }; }
        const response = await services.tickets.removeTicket(req);
        res.send(response);
    }
    
    catch (error) {
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
};
export default {
    bookTicket,
    getByUser,
    cancelTicket
}