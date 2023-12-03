const slotService = require('../services/slotService');
const sessionService = require('../services/sessionService');
import { io } from '../server';

const getHomePage = async (req, res) => {
    return res.render('home', { url: process.env.URL_SERVER, port: process.env.PORT, sessionInfo: req.session.info });
};

const bookSlot = async (req, res) => {
    const slotBooked = req.body;
    const username = req.session.info.username;
    await slotService.updateSlotBooked(slotBooked);
    await sessionService.addSession(username, slotBooked.slotNumber);
    io.emit('fetch slot data', 'Broadcast success!!!');

    return res.status(200).json({ message: 'Success!!!' });
};

const showSlotBooking = async (req, res) => {
    const username = req.session.info.username;
    let session = await sessionService.getSession(username);
    if (session) {
        return res.status(200).json(session.slotNumber);
    }
};

module.exports = {
    getHomePage,
    bookSlot,
    showSlotBooking,
};
