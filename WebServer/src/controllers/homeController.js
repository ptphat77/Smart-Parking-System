const slotService = require('../services/slotService');

const getHomePage = async (req, res) => {
    return res.render('home');
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
