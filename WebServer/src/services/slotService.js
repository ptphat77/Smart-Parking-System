const Slot = require('../models/Slot');

const getSlotList = async () => {
    try {
        let slotList = await Slot.find();
        return slotList
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

module.exports = {
    getSlotList
};