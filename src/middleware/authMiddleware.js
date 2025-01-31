const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        console.log("No token provided!");
        return res.status(403).send({ message: "No token provided!" });
    }

    console.log("Token received:", token);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Unauthorized!", err);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;