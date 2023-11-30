const slotService = require('../services/slotService');

const getHomePage = async (req, res) => {
    console.log(process.env.URL_SERVER)
    return res.render('home', { url: process.env.URL_SERVER, port: process.env.PORT });
};

const bookSlot = async (req, res) => {
    const slotBooked = req.body;
    await slotService.updateSlotBooked(slotBooked);
    return res.status(200).json({ message: 'Success!!!' });
};

module.exports = {
    getHomePage,
    bookSlot,
};
