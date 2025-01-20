const {User} = require("../models");
const addUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    if(!firstName || !lastName || !email){
        return res.status(400).json({error:"all fields are req."})
    }
    try {
        const user = await User.create({ firstName, lastName, email });
        res.status(201).json(user);
    } catch (error) {
        if(error.name === "SequelizeUniqueConstraintError"){
            const explanation = error.errors.map((err) => `${err.message}: ${err.value}`);
            return res.status(400).json({ error: explanation });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addUser
}