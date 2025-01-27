const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/key");

exports.signup = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).send({ message: "Email already in use" });
    }

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

exports.signin = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Incorrect password",
        });
    }
    const token = jwt.sign({id: user.id, firstname: user.firstname, lastname: user.lastname},
        config.secret,
        {
            algorithm: "HS256",
            allowInsecureKeySizes: true,
            expiresIn: 86400, // la session expire dans 24h
        });
    res.status(200).send({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        accessToken: token,
    });
}