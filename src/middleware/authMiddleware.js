const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        console.log("No token provided!");
        return res.status(403).send({ message: "No token provided!" });
    }

    console.log("Token received:", token);

    jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Unauthorized!", err);
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

module.exports = authMiddleware;