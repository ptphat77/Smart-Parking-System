const slotService = require('../services/slotService');
const Session = require('../models/Session');

const addSession = async (username, slotNumber) => {
    try {
        const session = new Session({ username, slotNumber });
        await session.save();
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

const getSession = async (username) => {
    const session = await Session.findOne({ username: username });
    return session;
};

const removeSession = async (username) => {
    try {
        let { slotNumber } = await Session.findOneAndDelete({ username: username });
        await slotService.cancelBooking(slotNumber);
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

module.exports = {
    addSession,
    getSession,
    removeSession,
};
