const slotService = require('../services/slotService');
const userService = require('../services/userService');
import { io } from '../server';

const updateFunc = async (req, res) => {
    if (req.body.errorCode == 0) {
        await slotService.updateSlotBlank(req.body.data);

        io.emit('fetch slot data', 'Broadcast success!!!');
        return res.status(200).json({ message: 'Success!!!' });
    } else {
        return res.status(400).json({ message: 'Failed!!!' });
    }
};

const readFunc = async (req, res) => {
    const slotList = await slotService.getSlotList();
    const availability = await userService.getAvailability();
    return res.status(200).json({slotList, availability});
};

module.exports = {
    updateFunc,
    readFunc,
};
