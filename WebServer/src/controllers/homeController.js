const slotService = require('../services/slotService');
import { io } from '../server';

const getHomePage = async (req, res) => {
    return res.render('home', { url: process.env.URL_SERVER, port: process.env.PORT });
};

const bookSlot = async (req, res) => {
    const slotBooked = req.body;
    await slotService.updateSlotBooked(slotBooked);
    io.emit('fetch slot data', 'Broadcast success!!!');

    return res.status(200).json({ message: 'Success!!!' });
};

module.exports = {
    getHomePage,
    bookSlot,
};
