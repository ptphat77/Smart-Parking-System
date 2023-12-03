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

const removeSession = async (username) => {};

module.exports = {
    addSession,
    getSession,
    removeSession,
};
