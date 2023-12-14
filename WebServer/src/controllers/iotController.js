const fs = require('fs');

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
    const unavailable = await userService.getUnavailable();
    return res.status(200).json({ slotList, unavailable });
};

const storeNumberPlate = async (req, res) => {
    const numberPlate = req.body.numberPlate;

    const fileName = 'numberPlate.txt';

    const dataToWrite = numberPlate;

    // Write number plate to file
    fs.writeFile(fileName, dataToWrite, (err) => {
        if (err) {
            console.error(`Write Number Plate to ${fileName} failed!!!`, err);
            return;
        }
        console.log(`Write Number Plate to ${fileName} successfully!!!`);
    });

    return res.status(200).json({ message: 'storeNumberPlate success!!!' });
};

module.exports = {
    updateFunc,
    readFunc,
    storeNumberPlate,
};
