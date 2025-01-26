const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
    });
    try {
        await user.save();
        res.send({ message: "User was successfully registered!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Erreur lors de la création du compte");
    }
};