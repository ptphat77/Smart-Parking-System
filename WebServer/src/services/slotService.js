const Slot = require('../models/Slot');

const getSlotList = async () => {
    try {
        let slotList = await Slot.find();
        return slotList;
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

const updateSlotBlank = async (sensorData) => {
    try {
        for (let [index, value] of sensorData.entries()) {
            if (value) {
                await Slot.updateOne({ slotNumber: index }, { isBlank: value });
            } else {
                await Slot.updateOne({ slotNumber: index }, { isBlank: value, isBooked: false });
            }
        }
        
        io.emit('fetch slot data', 'Broadcast success!!!');
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

const updateSlotBooked = async (slotBooked) => {
    try {
        let response = await Slot.updateOne({ slotNumber: slotBooked.slotNumber }, { isBooked: slotBooked.isBooked });
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

module.exports = {
    getSlotList,
    updateSlotBlank,
    updateSlotBooked,
};
