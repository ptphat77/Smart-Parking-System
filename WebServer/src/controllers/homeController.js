const slotService = require('../services/slotService');
const qrService = require('../services/qrService');
import { io } from '../server';

const getHomePage = async (req, res) => {
    console.log("Session Info: ", req.session.info);
    return res.render('home', { url: process.env.SERVER_URL, port: process.env.PORT, sessionInfo: req.session.info });
};

const bookSlot = async (req, res) => {
    try {
        const slotBooked = req.body;
        const username = req.session.info.username;
        await slotService.updateSlotBooked(slotBooked);
        await qrService.createToken(username);
        io.emit('fetch slot data', 'Broadcast success!!!');

        return res.status(200).json({ message: 'Success!!!' });
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const showSlotBooking = async (req, res) => {
    try {
        const username = req.session.info.username;
    } catch (error) {
        console.log('>>> Controller error:', error);
    }
};

const cancelSlotBooking = async (req, res) => {
    const username = req.body.username;
    try {
        await qrService.removeToken(username);
        io.emit('fetch slot data', 'Broadcast success!!!');
        return res.status(200).json({ message: 'Success!!!' });
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
