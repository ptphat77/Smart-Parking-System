const slotService = require('../services/slotService');
import { io } from '../server';

const updateFunc = async (req, res) => {
    if (req.body.errorCode == 0) {
        await slotService.updateSlotBlank(req.body.data);
        console.log(req.body.data);
        io.emit('fetch slot data', 'Broadcast success!!!');

        return res.status(200).json({ message: 'Success!!!' });
    } else {
        return res.status(400).json({ message: 'Failed!!!' });
    }
};

const readFunc = async (req, res) => {
    let slotList = await slotService.getSlotList();
    return res.status(200).json(slotList);
};

module.exports = {
    updateFunc,
    readFunc,
};
