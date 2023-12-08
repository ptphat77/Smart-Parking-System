const User = require('../models/User');

const getAvailability = async () => {
    const availability = await User.countDocuments({ isParking: true });
    return availability;
};

const setIsParking = async (username, value) => {
    await User.updateOne({ username }, { isParking: value });
};

const getIsParking = async (username) => {
    const data = await User.findOne({ username }, 'isParking');
    return data.isParking;
};

module.exports = {
    getAvailability,
    setIsParking,
    getIsParking,
};
