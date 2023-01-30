import User from "../models/user.js";

export const currUser = async (email) => {
    try {
        const user = await User
            .findOne({
                where: {
                    email
                }
            }).catch((err) => {
                throw err;
            });
        return user;
    } catch (error) {
        throw error;
    }
}

export const newUser = async (name, email, npass, nrole) => {
    try {
        await User.create({
            name: name,
            email: email,
            password: npass,
            role: nrole
        });
        return {
            "status": "user created!"
        }
    } catch (error) {
        throw error;
    }
}