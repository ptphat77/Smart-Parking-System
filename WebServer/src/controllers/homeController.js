const slotService = require('../services/slotService');

const showSlot = async (req, res) => {
    // return res.send("Welcome to site!")
    let slotList = await slotService.getSlotList();
    return res.render('home', { slotList });
};

module.exports = {
    showSlot,
};
