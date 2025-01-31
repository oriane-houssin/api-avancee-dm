const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    // Votre logique de signup ici
};

exports.signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            message: "Incorrect password",
        });
    }

    const token = jwt.sign(
        { id: user.id, firstname: user.firstname, lastname: user.lastname },
        process.env.JWT_SECRET,
        {
            algorithm: "HS256",
            expiresIn: 86400, // la session expire dans 24h
        }
    );
    res.cookie("accessToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none', // Assurez-vous que sameSite est configuré correctement
        maxAge: 86400 * 1000,
    });
    res.status(200).send({
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
    });
};

exports.logout = (req, res) => {
    res.clearCookie("accessToken");
    res.status(200).send({ message: "Logout successful" });
};