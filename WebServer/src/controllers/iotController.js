const slotService = require('../services/slotService');

const getDataIoT = async (req, res) => {
    if (req.body.errorCode == 0) {
        await slotService.updateSlotList(req.body.data);
        console.log(req.body.data);
        return res.status(200).json({ message: 'Success!!!' });
    } else {
        return res.status(400).json({ message: 'Failed!!!' });
    }
};

module.exports = {
    getDataIoT,
};
