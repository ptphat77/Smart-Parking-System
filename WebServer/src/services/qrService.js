const randomstring = require("randomstring");

const User = require('../models/User');

const createToken = async (username) => {
    const token = randomstring.generate({
        length: 32,
    });
    await User.updateOne({ username }, { token });
}

const removeToken = async (username) => {
    await User.updateOne({ username }, { token: null });
}

module.exports = {
    createToken,
    removeToken,
};
