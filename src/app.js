require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const apicache = require('apicache');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importer cookie-parser

const app = express();
const authcontroller = require("./controller/authcontroller");
const announcementcontroller = require("./controller/announcementcontroller");
const authMiddleware = require("./middleware/authMiddleware");
require('./config/passportConfig');

const cache = apicache.middleware;
const limiter = rateLimit({
    windowMs: 1000,
    max: 10,
});

// Configurer CORS pour permettre les requêtes provenant de http://localhost:8080
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Utiliser cookie-parser
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(limiter);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.post("/api/auth/signup", authcontroller.signup);
app.post("/api/auth/signin", authcontroller.signin);
app.post("/api/auth/logout", authcontroller.logout);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:8080' }), (req, res) => {
    res.redirect('http://localhost:8080'); // Rediriger vers le frontend après une connexion réussie
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: 'http://localhost:8080' }), (req, res) => {
    res.redirect('http://localhost:8080'); // Rediriger vers le frontend après une connexion réussie
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: 'http://localhost:8080' }), (req, res) => {
    res.redirect('http://localhost:8080'); // Rediriger vers le frontend après une connexion réussie
});

app.get("/api/token", (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return res.status(401).json({ message: "No token found" });
    }
    res.json({ token });
});

app.post("/api/announcements", authMiddleware, announcementcontroller.createAnnouncement);
app.put("/api/announcements/:id", authMiddleware, announcementcontroller.updateAnnouncement);
app.delete("/api/announcements/:id", authMiddleware, announcementcontroller.deleteAnnouncement);
app.get("/api/announcements", authMiddleware, cache('5 minutes'), announcementcontroller.getAnnouncements);
app.get("/api/announcements/:id", authMiddleware, announcementcontroller.getAnnouncement);

module.exports = app;