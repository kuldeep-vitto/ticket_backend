import Theater from "../models/theater.js";

export const allTheaters = async (id) => {
    try {
        const theaters = await Theater.findAll({
            where: {
                user_id: id
            }
        });
        return theaters;
    } catch (error) {
        throw error;
    }
}

export const newTheater = async (id,theater_name, capacity) => {
    try {
        await Theater.create({
            user_id: id,
            theater_name: theater_name,
            capacity: capacity
        });
        return {
            "message": "theater added"
        }
    } catch (error) {
        throw error;
    }
}