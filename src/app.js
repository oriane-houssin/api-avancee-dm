require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const authcontroller = require("./controller/authcontroller");
const authMiddleware = require("./middleware/authMiddleware");
const announcementcontroller = require("./controller/announcementcontroller");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/boite-annonces?retryWrites=true&w=majority')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.post("/api/auth/signup", authcontroller.signup);
app.post("/api/auth/signin", authcontroller.signin);



app.post("/api/announcements", authMiddleware, announcementcontroller.createAnnouncement);
app.put("/api/announcements/:id", authMiddleware, announcementcontroller.updateAnnouncement);
app.delete("/api/announcements/:id", authMiddleware, announcementcontroller.deleteAnnouncement);
app.get("/api/announcements", authMiddleware, announcementcontroller.getAnnouncements);
app.get("/api/announcements/:id", authMiddleware, announcementcontroller.getAnnouncement);

module.exports = app;