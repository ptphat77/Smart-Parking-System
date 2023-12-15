const User = require('../models/User');

const getUnavailable = async () => {
    const unavailable = await User.countDocuments({ userStatus: { $ne: 0 } });
    return unavailable;
};

const setUserStatus = async (username, value) => {
    await User.updateOne({ username }, { userStatus: value });
};

const setStartTime = async (username) => {
    await User.updateOne({ username }, { startTime: Date.now() });
};

const paymentBooking = async (username) => {
    const data = await User.findOne({ username }, 'startTime');

    const time = Math.round((( Date.now() - data.startTime ) / 1000));
    // price = 1 VND/s
    const price = 1;

    await User.findOneAndUpdate({ username }, { $inc: { balance: -(price * time) }, startTime: Date.now() });
};

const paymentParking = async (username) => {
    const data = await User.findOne({ username }, 'startTime');

    const time = Math.round((( Date.now() - data.startTime ) / 1000));
    // price = 1 VND/s
    const price = 0.5;

    await User.findOneAndUpdate({ username }, { $inc: { balance: -(price * time) }, startTime: null});
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
    paymentBooking,
    getBalanceUser,
    paymentParking
};
