const slotService = require('../services/slotService');

const getDataIoT = async (req, res) => {
    if (req.body.errorCode == 0) {
        await slotService.updateSlotList(req.body.data);
    }

    return res.status(200).json(req.body);
};

module.exports = {
    getDataIoT,
};
