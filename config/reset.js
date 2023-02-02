import Show from "../models/show.js";
import Theater from "../models/theater.js";
import Ticket from "../models/ticket.js";
import User from "../models/user.js";
const reset = async (req, res) => {
    await Show.drop({ cascade: true }); 
    await Theater.drop({ cascade: true });
    await Ticket.drop({ cascade: true });
    await User.drop({ cascade: true });
    console.log("All tables dropped!");
    res.send("Reset Successfull!!")
}
export default reset;