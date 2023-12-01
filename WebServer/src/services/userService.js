const User = require('../models/User');

const createUser = async (userData) => {
    // try {
    //     let slotList = await Slot.find();
    //     return slotList;
    // } catch (error) {
    //     console.log('>>> check error:', error);
    // }
    const user = new User(userData);
    user.save();
};

module.exports = {
    createUser,
};
