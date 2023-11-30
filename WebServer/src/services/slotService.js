const Slot = require('../models/Slot');

const getSlotList = async () => {
    try {
        let slotList = await Slot.find();
        return slotList;
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

const updateSlotBlank = async (sensorData) => {
    try {
        for (let [index, value] of sensorData.entries()) {
            await Slot.updateOne({ slotNumber: index }, { isBlank: value });
        }
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

const updateSlotBooked = async (slotBooked) => {
    console.log('slotBooked: ', slotBooked);

    console.log('slotBooked service: ', slotBooked.slotNumber);
    try {
        let response = await Slot.updateOne({ slotNumber: slotBooked.slotNumber }, { isBooked: slotBooked.isBooked });
        console.log('response', response);
    } catch (error) {
        console.log('>>> check error:', error);
    }
};

module.exports = {
    getSlotList,
    updateSlotBlank,
    updateSlotBooked,
};
