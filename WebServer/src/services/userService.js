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

    // await User.updateOne({ username }, { startTime: Date.now() });
    await User.findOneAndUpdate({ username }, { $inc: { balance: -(price * time) }, startTime: null });
};

const getIsParking = async (username) => {
    const data = await User.findOne({ username }, 'isParking');
    return data.isParking;
};

module.exports = {
    getAvailability,
    setIsParking,
    getIsParking,
    setCreatedAtToken,
    paymentBooking,
};
