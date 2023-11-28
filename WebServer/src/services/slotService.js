const Slot = require('../models/Slot');

const getSlotList = async () => {
    try {
        let slotList = await Slot.find();
        return slotList;
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

const updateSlotList = async (sensorData) => {
    try {
        for (let [index, value] of sensorData.entries()) {
            await Slot.updateOne({ slotNumber: index }, { isBlank: value });
        }
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

module.exports = {
    getSlotList,
    updateSlotList,
};
