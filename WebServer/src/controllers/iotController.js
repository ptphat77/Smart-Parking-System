const slotService = require('../services/slotService');
const userService = require('../services/userService');
import { io } from '../server';

const updateFunc = async (req, res) => {
    console.log("req.body: " + req.body.data[0].isBlank);
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
    const unavailable = await userService.getUnavailable();
    return res.status(200).json({ slotList, unavailable });
};


module.exports = {
    updateFunc,
    readFunc,
};
