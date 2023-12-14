const User = require('../models/User');

const getAvailability = async () => {
    const availability = await User.countDocuments({ isParking: true });
    return availability;
};

const setIsParking = async (username, value) => {
    await User.updateOne({ username }, { isParking: value });
};

const setCreatedAtToken = async (username) => {
    await User.updateOne({ username }, { startTime: Date.now() });
};

const paymentBooking = async (username) => {
    const data = await User.findOne({ username }, 'startTime');

    const time = Math.round((( Date.now() - data.startTime ) / 1000));
    // price = 1 VND/s
    const price = 1;

    await User.findOneAndUpdate({ username }, { $inc: { balance: -(price * time) }, startTime: null });
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
    getAvailability,
    setIsParking,
    getUserStatus,
    setCreatedAtToken,
    paymentBooking,
    getBalanceUser
};
