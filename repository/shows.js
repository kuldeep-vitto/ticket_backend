import Theater from "../models/theater.js";
import Show from "../models/show.js";
import { Op } from "sequelize";

export const allShows = async () => {
    try {
        const shows = await Show.findAll();
        return shows;
    } catch (error) {
        throw error;
    }
}

export const getTheater = async (theater_id) => {
    try {
        const theater = await Theater.findOne({ where: { id: theater_id } });
        return theater;
    } catch (error) {
        throw error;
    }
}

export const overlaps = async (theater_id, start_time, end_time) => {
    try {
        const flag = await Show.findAll({
            where: {
                theater_id: theater_id,
                start_time: { [Op.lte]: end_time },
                end_time: { [Op.gte]: start_time }
            }
        });
        return flag;
    } catch (error) {
        throw error;
    }
}

export const addShow = async (movie_name, theater_id, duration, start_time, end_time, seats_available) => {
    try {
        const show = new Show({ movie_name, theater_id, duration, start_time, end_time, seats_available });
        await show
            .save()
            .catch((err) => {
                throw err;
            });
        return {
            "status": "show created!"
        };
    } catch (error) {
        throw error;
    }
}

export const byTheater = async (id) => {
    try {
        const shows=await Show.findAll({
            where: {
                theater_id: id
            }
        });
        return shows;
    } catch (error) {
        throw error;
    }
}

export const byName = async (name) => {
    try {
        const shows = await Show.findAll({
            where: {
                movie_name: {
                    [Op.iLike]: name
                }
            }
        });
        return shows;
    } catch (error) {
        throw error;
    }
}