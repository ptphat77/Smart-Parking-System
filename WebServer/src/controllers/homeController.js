const slotService = require('../services/slotService');
const sessionService = require('../services/sessionService');
import { io } from '../server';

const getHomePage = async (req, res) => {
    return res.render('home', { url: process.env.URL_SERVER, port: process.env.PORT, sessionInfo: req.session.info });
};

const bookSlot = async (req, res) => {
    try {
        const slotBooked = req.body;
        const username = req.session.info.username;
        await slotService.updateSlotBooked(slotBooked);
        await sessionService.addSession(username, slotBooked.slotNumber);
        io.emit('fetch slot data', 'Broadcast success!!!');

        return res.status(200).json({ message: 'Success!!!' });
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const showSlotBooking = async (req, res) => {
    try {
        const username = req.session.info.username;
        let session = await sessionService.getSession(username);
        if (session) {
            return res.status(200).json(session.slotNumber);
        }
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const cancelSlotBooking = async (req, res) => {
    const username = req.body.username;
    try {
        await sessionService.removeSession(username);
        io.emit('fetch slot data', 'Broadcast success!!!');
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

module.exports = {
    getHomePage,
    bookSlot,
    showSlotBooking,
    cancelSlotBooking,
};
