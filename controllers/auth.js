import services from "../services/index.js";
const mailCheck = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const passCheck = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email == null || password == null) { throw {statusCode: 406, message: "Missing fields."}; }
        if (!mailCheck.test(email)) { throw {statusCode: 406, message: "Not a valid email."}; }                  //validate email type
        const token = await services.auth.loginService(email,password);
        return res.json({
            token: token
        });
    }
    catch (error) {
       // console.log("fdgfdgvoifvgpf  ",error.statusCode);
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }

};
const userSignUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;                                                //getting data from body
        if (name == null || email == null || password == null || role == null) { return res.status(406).send("Missing Fields!"); }
        if (!mailCheck.test(email)) { throw {statusCode: 406, message: "Not a valid email."}; }               //validate email type
        if (!passCheck.test(password)) { throw {statusCode: 406, message: "Not a valid password."}; } 
        const response = await services.auth.signupService(name, email, password, role);
        return res.status(201).send(response);
    }
    catch (error) {
        if (error.statusCode) {
             return res.status(error.statusCode).json(error.message);
        }
        return res.status(500).json({ message: error.message });
    }
    
};  
export default {
    userLogin,
    userSignUp
}