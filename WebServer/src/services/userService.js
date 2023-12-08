const User = require('../models/User');

const getAvailability = async () => {
    const availability = await User.countDocuments({ isParking: true });
    return availability;
};

module.exports = {
    getAvailability,
};
