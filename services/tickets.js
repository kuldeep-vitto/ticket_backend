import { addTicket, getShow, updateShow, getTickets, oneTicket, deleteTicket } from "../repository/tickets.js";

const newTicket = async (req) => {
    try {
        const { show_id, booked_seats } = req.body;
        const show = await getShow(show_id);
        if (!show) { throw { statusCode: 404, message: "This show doesn't exist!!" }; }
        if (show.seats_available < booked_seats) {
            throw { statusCode: 405, message: "These many seats are not available!!" };
        }
        const book = await addTicket(req.user.id, show_id, booked_seats);
        const newSeats = show.seats_available - booked_seats;
        const update = await updateShow(newSeats, show_id);
        if (book && update) {
            return {
                "message": "Ticket booked successfully."
            }
        }
    } catch (error) {
        throw error;
    }
}
const userTickets = async (id) => {
    try {
        const tickets = await getTickets(id);
        if (tickets.length === 0) { throw { statusCode: 405, message: "No booked tickets!!" }; }
        return tickets;
    } catch (error) {
        throw error;
    }
}
const removeTicket = async (req) => {
    try {
        const ticket = await oneTicket(req.params.id);
        if (!ticket) { throw { statusCode: 400, message: "No suck ticket exist!!" }; }
        if (req.user.id !== ticket.user_id) {
            throw { statusCode: 401, message: "Unauthorised Cancellation!!" };
        }
        else {
            const show = await getShow(ticket.show_id);
            const newSeats = show.seats_available + ticket.booked_seats;
            const update = await updateShow(newSeats, ticket.show_id);
            const remove = await deleteTicket(req.params.id);
            if (update && remove) {
                return {
                    "message" : "Ticket Cancelled!!"
                }
            }
        }
    } catch (error) {
        throw error;
    }
}

export default {
    newTicket,
    userTickets,
    removeTicket
}