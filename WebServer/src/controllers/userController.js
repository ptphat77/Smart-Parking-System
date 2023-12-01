const slotService = require('../services/slotService');

const createFunc = async (req, res) => {
    if (req.body.errorCode == 0) {
        await slotService.updateSlotBlank(req.body.data);
        io.emit('fetch slot data', 'Broadcast success!!!');

        return res.status(200).json({ message: 'Success!!!' });
    } else {
        return res.status(400).json({ message: 'Failed!!!' });
    }
};

module.exports = {
    createFunc,
};
