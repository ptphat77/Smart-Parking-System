const User = require('../models/User');

const checkUser = async (userlogin) => {
    // try {
    //     let slotList = await Slot.find();
    //     return slotList;
    // } catch (error) {
    //     console.log('>>> check error:', error);
    // }
    const user = new User(userlogin);
    user.save();
};

module.exports = {
    checkUser,
};
