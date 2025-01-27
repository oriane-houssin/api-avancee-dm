const Announcement = require("../models/announcement");

exports.createAnnouncement = async (req, res) => {
    const announcement = new Announcement({
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        user: req.userId,
    });

    try {
        await announcement.save();
        res.send({ message: "Announcement created successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error creating announcement");
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!announcement) {
            return res.status(404).send("Announcement not found");
        }
        res.send(announcement);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating announcement");
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) {
            return res.status(404).send("Announcement not found");
        }
        res.send({ message: "Announcement deleted successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Error deleting announcement");
    }
};

exports.getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find({ user: req.userId });
        res.send(announcements);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching announcements");
    }
};

exports.getAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).send("Announcement not found");
        }
        res.send(announcement);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error fetching announcement");
    }
};