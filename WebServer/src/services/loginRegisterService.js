const User = require('../models/User');

const checkUserLogin = async (username, password) => {
    try {
        let user = await User.findOne({
            username: username,
            password: password,
        });
        return user;
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

const registerNewUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
    } catch (error) {
        console.log('>>> Service error:', error);
    }
};

module.exports = {
    checkUserLogin,
    registerNewUser,
};
