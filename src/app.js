const express = require('express');
const mongoose = require("mongoose");
const app = express();
const authcontroller = require("./controller/authcontroller");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://127.0.0.1:27017/boite-annonces?retryWrites=true&w=majority')
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.post("/api/auth/signup", authcontroller.signup);
app.post("/api/auth/signin", authcontroller.signin);
module.exports = app;

//Annoucement Part
const announcementcontroller = require("./controller/announcementcontroller");

app.post("/api/announcements", announcementcontroller.createAnnouncement);
app.put("/api/announcements/:id", announcementcontroller.updateAnnouncement);
app.delete("/api/announcements/:id", announcementcontroller.deleteAnnouncement);
app.get("/api/announcements", announcementcontroller.getAnnouncements);
app.get("/api/announcements/:id", announcementcontroller.getAnnouncement);