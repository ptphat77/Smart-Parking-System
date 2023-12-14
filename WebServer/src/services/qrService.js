const randomstring = require('randomstring');

const User = require('../models/User');

const createToken = async (username) => {
    const token = randomstring.generate({
        length: 32,
    });
    await User.updateOne({ username }, { token });

    return token;
};

const removeToken = async (username) => {
    await User.updateOne({ username }, { token: null });
};

const getToken = async (username) => {
    const data = await User.findOne({ username }, 'token');
    return data.token;
};

const getUsername = async (token) => {
    const data = await User.findOne({ token }, 'username');
    return data?.username;
};

module.exports = {
    createToken,
    removeToken,
    getToken,
    getUsername,
};
