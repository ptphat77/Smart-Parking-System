const User = require('../models/User');

const getUnavailable = async () => {
    const unavailable = await User.countDocuments({ userStatus: { $ne: 0 } });
    return unavailable;
};

const setUserStatus = async (username, value) => {
    await User.updateOne({ username }, { userStatus: value });
};

const setStartTime = async (username) => {
    const data = await User.findOneAndUpdate({ username }, { startTime: Date.now() });
    return data
};

const payment = async (username, price) => {
    const data = await User.findOne({ username }, 'startTime');

    const time = Math.round((Date.now() - data.startTime) / 1000);

    await User.findOneAndUpdate({ username }, { $inc: { balance: Math.round(-(price * time)) }, startTime: null });
};

const getUserStatus = async (username) => {
    const data = await User.findOne({ username }, 'userStatus');
    return data.userStatus;
};

const getBalanceUser = async (username) => {
    const data = await User.findOne({ username }, 'balance');
    return data.balance;
};

module.exports = {
    getUnavailable,
    setUserStatus,
    getUserStatus,
    setStartTime,
    payment,
    getBalanceUser,
};
