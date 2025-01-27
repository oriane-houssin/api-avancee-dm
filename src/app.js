require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const apicache = require('apicache');
const app = express();
const authcontroller = require("./controller/authcontroller");
const announcementcontroller = require("./controller/announcementcontroller");
const authMiddleware = require("./middleware/authMiddleware");
require('./config/passportConfig');

const cache = apicache.middleware;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.post("/api/auth/signup", authcontroller.signup);
app.post("/api/auth/signin", authcontroller.signin);
app.post("/api/auth/logout", authcontroller.logout);

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

app.post("/api/announcements", authMiddleware, announcementcontroller.createAnnouncement);
app.put("/api/announcements/:id", authMiddleware, announcementcontroller.updateAnnouncement);
app.delete("/api/announcements/:id", authMiddleware, announcementcontroller.deleteAnnouncement);
app.get("/api/announcements", authMiddleware, cache('5 minutes'), announcementcontroller.getAnnouncements);
app.get("/api/announcements/:id", authMiddleware, announcementcontroller.getAnnouncement);

module.exports = app;