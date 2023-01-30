import { addShow, allShows, byName, byTheater, getTheater, overlaps } from "../repository/shows.js";
import getEndTime from "../config/endtime.js";
const findAllShows = async() => {
    try {
        const shows = await allShows();
        return shows;
    } catch (error) {
        throw error;
    }
}
const newShow = async (req) => {
    try {
        const { movie_name, theater_id, duration, start_time } = req.body;
        const theater = await getTheater(theater_id);
        if (!theater) { throw { statusCode: 405, message: "Please add this theater first!" }; }
        if (req.user.role !== "admin" || req.user.id !== theater.user_id) {
            throw { statusCode: 401, message: "Unauthorised Access!!" };
        }
        const end_time = getEndTime(start_time, duration);
        const seats_available = theater.capacity;
       // movie_name = movie_name.toLowerCase().replace(/\b[a-z]/g, function(letter) { return letter.toUpperCase();});
        
        const flag = await overlaps(theater_id, start_time, end_time);

        console.log(flag);
        if (flag.length != 0) { throw { statusCode: 501, message: "This timing is overlaping with an existing show. Please either change time or choose a different theater!!" }; }
        return await addShow(movie_name, theater_id, duration, start_time, end_time, seats_available);
        
    } catch (error) {
        throw error;
    }
}
const filterTheater = async (id) => {
    try {
        const theater = await getTheater(id);
        if (!theater) { throw { statusCode: 405, message: "Please add this theater first!!" }; }
        const shows = await byTheater(id);
        if (shows.length == 0) { throw { statusCode: 204, message: "No show at this theater!!" }; }
        else { return shows; }
    } catch (error) {
        throw error;
    }
}
const filterShow = async (name) => {
    try {
        const shows = await byName(name);
        if (shows.length === 0) {
            throw { statusCode: 204, message: "No shows for this movie!!" };
        }
        return shows;
    } catch (error) {
        throw error;
    }
}
export default {
    findAllShows,
    newShow,
    filterTheater,
    filterShow
}