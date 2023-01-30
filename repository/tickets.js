import Ticket from "../models/ticket.js";
import Show from "../models/show.js";
export const addTicket = async (userId,showId,bookedSeats) => {
    try {
        await Ticket.create({
            user_id: userId,
            show_id: showId,
            booked_seats: bookedSeats
        });
        return {
            "message" : "Booked!!"
        }
    } catch (error) {
        throw error;
    }
}
export const getShow = async (show_id) => {
    try {
        const show = await Show.findOne({ where: { id: show_id } });
        return show;
    } catch (error) {
        throw error;
    }
}
export const updateShow = async (newSeats,showId) => {
    try {
        await Show.update({ seats_available: newSeats }, { where: { id: showId } });
        return {
            "message" : "updated"
        }
    } catch (error) {
        throw error;
    }
}
export const getTickets = async(id) => {
    try {
        const tickets = await Ticket.findAll({
            where: {
                user_id: id
            }
        });
        return tickets;
    } catch (error) {
        throw error;
    }
}
export const oneTicket = async (tickedId) => {
    try {
        const ticket = await Ticket.findOne({ where: { id: tickedId } });
        return ticket;
    } catch (error) {
        throw error;
    }
}
export const deleteTicket = async (tickedId) => {
    try {
        await Ticket.destroy({
                where: {
                    id: tickedId
                }
        });
        return {
            "message": "deleted"
        }
    } catch (error) {
        throw error;
    }
}